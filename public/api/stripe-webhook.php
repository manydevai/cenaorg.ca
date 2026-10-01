<?php
/**
 * CENA Stripe Webhook Handler — Hostinger Endpoint
 * 
 * Listens for Stripe webhook events:
 * - checkout.session.completed (payment_status == 'paid')
 * - payment_intent.succeeded
 * 
 * Only counts REAL finalized payments. Abandoned/failed checkouts are NOT counted.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$payload = @file_get_contents('php://input');
$sigHeader = isset($_SERVER['HTTP_STRIPE_SIGNATURE']) ? $_SERVER['HTTP_STRIPE_SIGNATURE'] : '';

if (empty($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Empty request body']);
    exit;
}

// Optional: check secret if configured in environment or local config
$webhookSecret = getenv('STRIPE_WEBHOOK_SECRET') ?: '';
$configFile = __DIR__ . '/config.php';
if (empty($webhookSecret) && file_exists($configFile)) {
    $cfg = include $configFile;
    if (is_array($cfg) && !empty($cfg['STRIPE_WEBHOOK_SECRET'])) {
        $webhookSecret = $cfg['STRIPE_WEBHOOK_SECRET'];
    }
}

// Verify signature if secret is available
if (!empty($webhookSecret) && !empty($sigHeader)) {
    $signatureValid = false;
    $items = explode(',', $sigHeader);
    $timestamp = null;
    $signatures = [];

    foreach ($items as $item) {
        $parts = explode('=', trim($item), 2);
        if (count($parts) === 2) {
            if ($parts[0] === 't') {
                $timestamp = $parts[1];
            } elseif ($parts[0] === 'v1') {
                $signatures[] = $parts[1];
            }
        }
    }

    if ($timestamp && !empty($signatures)) {
        $signedPayload = $timestamp . '.' . $payload;
        $expectedSignature = hash_hmac('sha256', $signedPayload, $webhookSecret);
        foreach ($signatures as $sig) {
            if (hash_equals($expectedSignature, $sig)) {
                $signatureValid = true;
                break;
            }
        }
    }

    if (!$signatureValid) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid signature']);
        exit;
    }
}

$event = json_decode($payload, true);
if (!is_array($event) || !isset($event['type'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$eventType = $event['type'];
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
$dataFile = $dataDir . '/donations.json';

// Load existing stats
$stats = [
    'totalRaisedCents' => 0,
    'donorCount'       => 0,
    'lastUpdated'      => null,
    'donations'        => []
];

if (file_exists($dataFile)) {
    $existingRaw = @file_get_contents($dataFile);
    if ($existingRaw) {
        $decoded = json_decode($existingRaw, true);
        if (is_array($decoded)) {
            $stats = array_merge($stats, $decoded);
        }
    }
}

$recorded = false;

// 1. Process Completed Checkout Sessions
if ($eventType === 'checkout.session.completed') {
    $session = isset($event['data']['object']) ? $event['data']['object'] : null;
    if ($session) {
        $paymentStatus = isset($session['payment_status']) ? $session['payment_status'] : '';
        $amountTotal = isset($session['amount_total']) ? intval($session['amount_total']) : 0;
        $sessionId = isset($session['id']) ? $session['id'] : '';

        // ONLY count if payment is actually finalized/paid!
        if ($paymentStatus === 'paid' && $amountTotal > 0 && !empty($sessionId)) {
            // Check for duplicate processing
            $alreadyProcessed = false;
            foreach ($stats['donations'] as $d) {
                if (isset($d['id']) && $d['id'] === $sessionId) {
                    $alreadyProcessed = true;
                    break;
                }
            }

            if (!$alreadyProcessed) {
                $stats['totalRaisedCents'] += $amountTotal;
                $stats['donorCount'] += 1;
                $stats['lastUpdated'] = gmdate('c');
                $stats['donations'][] = [
                    'id'          => $sessionId,
                    'amountCents' => $amountTotal,
                    'date'        => gmdate('c'),
                    'type'        => 'checkout.session'
                ];
                $recorded = true;
            }
        }
    }
}

// 2. Process Successful PaymentIntents
if ($eventType === 'payment_intent.succeeded') {
    $pi = isset($event['data']['object']) ? $event['data']['object'] : null;
    if ($pi) {
        $amountReceived = isset($pi['amount_received']) ? intval($pi['amount_received']) : 0;
        $status = isset($pi['status']) ? $pi['status'] : '';
        $piId = isset($pi['id']) ? $pi['id'] : '';

        if ($status === 'succeeded' && $amountReceived > 0 && !empty($piId)) {
            $alreadyProcessed = false;
            foreach ($stats['donations'] as $d) {
                if (isset($d['id']) && $d['id'] === $piId) {
                    $alreadyProcessed = true;
                    break;
                }
            }

            if (!$alreadyProcessed) {
                $stats['totalRaisedCents'] += $amountReceived;
                $stats['donorCount'] += 1;
                $stats['lastUpdated'] = gmdate('c');
                $stats['donations'][] = [
                    'id'          => $piId,
                    'amountCents' => $amountReceived,
                    'date'        => gmdate('c'),
                    'type'        => 'payment_intent'
                ];
                $recorded = true;
            }
        }
    }
}

// Save stats if updated
if ($recorded) {
    file_put_contents($dataFile, json_encode($stats, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

// Always respond with 200 OK
http_response_code(200);
echo json_encode(['received' => true, 'recorded' => $recorded]);
