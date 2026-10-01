import { useState, useEffect, useCallback } from 'react';

export interface DonationStats {
  totalRaisedCents: number;
  totalRaisedDollars: number;
  donorCount: number;
  goalCents: number;
  goalDollars: number;
  percentage: number;
  lastUpdated: string | null;
}

const DEFAULT_STATS: DonationStats = {
  totalRaisedCents: 0,
  totalRaisedDollars: 0,
  donorCount: 0,
  goalCents: 1500000,
  goalDollars: 15000,
  percentage: 0,
  lastUpdated: null,
};

// In development, use fallback data. In production, call the real API.
const API_URL = '/api/donation-stats';

/**
 * Custom hook to fetch live donation stats from the backend API.
 * Polls every `pollInterval` ms (default 60s).
 * Gracefully falls back to $0 if API is unavailable (e.g. local dev).
 */
export function useDonationStats(pollInterval = 60000): {
  stats: DonationStats;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [stats, setStats] = useState<DonationStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      let response = await fetch(API_URL);
      if (!response.ok && response.status === 404) {
        response = await fetch('/api/donation-stats.php');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: DonationStats = await response.json();
      setStats(data);
      setError(null);
    } catch (err: any) {
      // In development (no Netlify), the API won't exist.
      // Gracefully return zero stats instead of crashing.
      console.warn('[useDonationStats] API unavailable, using $0 defaults:', err.message);
      setStats(DEFAULT_STATS);
      setError(null); // Don't show error to user — just show $0
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Poll for updates
    const interval = setInterval(fetchStats, pollInterval);
    return () => clearInterval(interval);
  }, [fetchStats, pollInterval]);

  return { stats, loading, error, refetch: fetchStats };
}

/**
 * Format a dollar amount for display.
 * Examples: formatDollars(8450) => '$8,450'
 *           formatDollars(0) => '$0'
 */
export function formatDollars(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
