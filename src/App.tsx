import { ActivityFeed } from './components/ActivityFeed';
import { EventHeader } from './components/EventHeader';
import { SessionList } from './components/SessionList';
import { StatsGrid } from './components/StatsGrid';
import { eventInfo, eventStats, recentActivity, sessions } from './data/event';

const trackCount = new Set(sessions.map((session) => session.track)).size;

export default function App() {
  return (
    <div className="min-h-screen">
      <EventHeader event={eventInfo} />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <StatsGrid stats={eventStats} trackCount={trackCount} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SessionList sessions={sessions} />
          </div>
          <ActivityFeed activity={recentActivity} />
        </div>
      </main>
    </div>
  );
}
