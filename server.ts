import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Stripe Configuration ─────────────────────────────────────────
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// ─── Donation Data Store (JSON file) ──────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
const STATS_FILE = path.join(DATA_DIR, 'donation-stats.json');
const GOAL_CENTS = 1500000; // $15,000 goal

interface DonationStats {
  totalRaisedCents: number;
  donorCount: number;
  lastUpdated: string | null;
  donations: Array<{
    amountCents: number;
    date: string;
    sessionId: string;
  }>;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStats(): DonationStats {
  ensureDataDir();
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading stats file:', err);
  }
  return {
    totalRaisedCents: 0,
    donorCount: 0,
    lastUpdated: null,
    donations: [],
  };
}

function writeStats(stats: DonationStats) {
  ensureDataDir();
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
}

// ─── CORS Middleware ──────────────────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, stripe-signature');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// ─── Stripe Webhook Endpoint ──────────────────────────────────────
// IMPORTANT: Must use raw body for Stripe signature verification
app.post(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
      console.error('Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // ── Process completed checkout sessions ──
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const amountTotal = session.amount_total ?? 0;

      if (amountTotal > 0) {
        const stats = readStats();
        const alreadyProcessed = stats.donations.some(
          (d) => d.sessionId === session.id
        );

        if (!alreadyProcessed) {
          stats.totalRaisedCents += amountTotal;
          stats.donorCount += 1;
          stats.lastUpdated = new Date().toISOString();
          stats.donations.push({
            amountCents: amountTotal,
            date: new Date().toISOString(),
            sessionId: session.id,
          });
          writeStats(stats);
          console.log(
            `✅ Donation recorded: $${(amountTotal / 100).toFixed(2)} — Total: $${(stats.totalRaisedCents / 100).toFixed(2)} (${stats.donorCount} donors)`
          );
        } else {
          console.log(`⚠️ Duplicate session ${session.id}, skipping`);
        }
      }
    }

    // ── Process successful payment intents (fallback for direct charges) ──
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const amountReceived = paymentIntent.amount_received ?? 0;

      if (amountReceived > 0) {
        const stats = readStats();
        const alreadyProcessed = stats.donations.some(
          (d) => d.sessionId === paymentIntent.id
        );

        if (!alreadyProcessed) {
          stats.totalRaisedCents += amountReceived;
          stats.donorCount += 1;
          stats.lastUpdated = new Date().toISOString();
          stats.donations.push({
            amountCents: amountReceived,
            date: new Date().toISOString(),
            sessionId: paymentIntent.id,
          });
          writeStats(stats);
          console.log(
            `✅ PaymentIntent recorded: $${(amountReceived / 100).toFixed(2)} — Total: $${(stats.totalRaisedCents / 100).toFixed(2)}`
          );
        }
      }
    }

    // Always return 200 to acknowledge receipt
    res.json({ received: true });
  }
);

// ─── JSON parsing for other API routes ────────────────────────────
app.use(express.json());

// ─── Donation Stats API Endpoint ──────────────────────────────────
app.get('/api/donation-stats', (req, res) => {
  const stats = readStats();
  const totalRaisedDollars = stats.totalRaisedCents / 100;
  const goalDollars = GOAL_CENTS / 100;
  const percentage = Math.min(
    Math.round((stats.totalRaisedCents / GOAL_CENTS) * 100),
    100
  );

  res.set('Cache-Control', 'public, max-age=15');
  res.json({
    totalRaisedCents: stats.totalRaisedCents,
    totalRaisedDollars,
    donorCount: stats.donorCount,
    goalCents: GOAL_CENTS,
    goalDollars,
    percentage,
    lastUpdated: stats.lastUpdated,
  });
});

// ─── Serve Static Vite Build ──────────────────────────────────────
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback — serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🎄 CENA server running on port ${PORT}`);
  console.log(`   Static files: ${distPath}`);
  console.log(`   Webhook: POST /api/stripe-webhook`);
  console.log(`   Stats:   GET  /api/donation-stats`);

  if (!STRIPE_SECRET_KEY) {
    console.warn('⚠️  STRIPE_SECRET_KEY not set — webhook verification will fail');
  }
  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn('⚠️  STRIPE_WEBHOOK_SECRET not set — webhook verification will fail');
  }
});
