import type { EventStats } from '../types';
import { formatNumber, percentOf } from '../lib/format';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  /** Optional 0–100 value rendered as a progress bar. */
  progress?: number;
}

function StatCard({ label, value, hint, progress }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <dt className="text-sm text-zinc-500">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
      <dd className="mt-1 text-xs text-zinc-500">{hint}</dd>
      {progress !== undefined && (
        <dd className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100" aria-hidden="true">
          <div className="h-full rounded-full bg-teal-600" style={{ width: `${progress}%` }} />
        </dd>
      )}
    </div>
  );
}

export function StatsGrid({ stats, trackCount }: { stats: EventStats; trackCount: number }) {
  const capacityUsed = percentOf(stats.registered, stats.capacity);
  const checkInRate = percentOf(stats.checkedIn, stats.registered);

  return (
    <section aria-label="Event statistics">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Registered"
          value={formatNumber(stats.registered)}
          hint={`${capacityUsed}% of ${formatNumber(stats.capacity)} capacity`}
          progress={capacityUsed}
        />
        <StatCard
          label="Checked in"
          value={formatNumber(stats.checkedIn)}
          hint={`${checkInRate}% of registered`}
          progress={checkInRate}
        />
        <StatCard label="Sessions" value={formatNumber(stats.sessions)} hint={`Across ${trackCount} tracks`} />
        <StatCard label="Speakers" value={formatNumber(stats.speakers)} hint="Confirmed" />
      </dl>
    </section>
  );
}
