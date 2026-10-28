import type { Activity, ActivityType } from '../types';
import { formatRelativeTime } from '../lib/format';

const dotColor: Record<ActivityType, string> = {
  registered: 'bg-sky-500',
  'checked-in': 'bg-teal-600',
  'joined-session': 'bg-amber-500',
  'left-feedback': 'bg-violet-500',
};

export function ActivityFeed({ activity }: { activity: Activity[] }) {
  return (
    <section aria-labelledby="activity-heading" className="rounded-lg border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 p-4">
        <h2 id="activity-heading" className="text-base font-semibold">
          Recent activity
        </h2>
        <p className="text-sm text-zinc-500">Latest attendee updates</p>
      </div>
      <ol className="divide-y divide-zinc-100">
        {activity.map((item) => (
          <li key={item.id} className="flex gap-3 p-4">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor[item.type]}`} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.attendee}</p>
              <p className="text-sm text-zinc-600">{item.detail}</p>
            </div>
            <time className="shrink-0 text-xs text-zinc-500">{formatRelativeTime(item.minutesAgo)}</time>
          </li>
        ))}
      </ol>
    </section>
  );
}
