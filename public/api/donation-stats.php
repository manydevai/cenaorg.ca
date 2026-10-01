<?php
/**
 * CENA Donation Stats API — Hostinger Endpoint
 * 
 * Returns the current campaign donation stats (total raised, donor count, goal, percentage).
 * Called periodically by the frontend hook `useDonationStats`.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: public, max-age=15');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataFile = __DIR__ . '/data/donations.json';
$goalCents = 1500000; // $15,000.00 CAD goal

$stats = [
    'totalRaisedCents'   => 0,
    'totalRaisedDollars' => 0,
    'donorCount'         => 0,
    'goalCents'          => $goalCents,
    'goalDollars'        => $goalCents / 100,
    'percentage'         => 0,
    'lastUpdated'        => null,
];

if (file_exists($dataFile)) {
    $raw = @file_get_contents($dataFile);
    if ($raw) {
        $data = json_decode($raw, true);
        if (is_array($data)) {
            $totalCents = isset($data['totalRaisedCents']) ? intval($data['totalRaisedCents']) : 0;
            $donorCount = isset($data['donorCount']) ? intval($data['donorCount']) : 0;
            $percentage = min(100, round(($totalCents / $goalCents) * 100));

            $stats['totalRaisedCents']   = $totalCents;
            $stats['totalRaisedDollars'] = $totalCents / 100;
            $stats['donorCount']         = $donorCount;
            $stats['percentage']         = $percentage;
            $stats['lastUpdated']        = isset($data['lastUpdated']) ? $data['lastUpdated'] : null;
        }
    }
}

echo json_encode($stats, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
