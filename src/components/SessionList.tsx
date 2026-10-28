import { useState } from 'react';
import type { Session } from '../types';
import { filterSessions } from '../lib/filterSessions';

export function SessionList({ sessions }: { sessions: Session[] }) {
  const [query, setQuery] = useState('');
  // WORKSHOP CHALLENGE: filterSessions is not implemented yet, so this is always the full list.
  const visibleSessions = filterSessions(sessions, query);

  return (
    <section aria-labelledby="sessions-heading" className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="sessions-heading" className="text-base font-semibold">
            Upcoming sessions
          </h2>
          <p className="text-sm text-zinc-500">Day 1 · {visibleSessions.length} shown</p>
        </div>
        <div className="sm:w-72">
          <label htmlFor="session-search" className="sr-only">
            Search sessions
          </label>
          <input
            id="session-search"
            type="search"
            placeholder="Search by title or speaker"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
          />
        </div>
      </div>

      {/* TODO(workshop): when no sessions match the query, show a helpful empty state instead of an empty list. */}
      <ul className="divide-y divide-zinc-100" aria-label="Sessions">
        {visibleSessions.map((session) => (
          <li key={session.id} className="flex gap-4 p-4">
            <div className="w-14 shrink-0 font-mono text-sm text-zinc-500 tabular-nums">{session.startTime}</div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium">{session.title}</h3>
              <p className="mt-0.5 text-sm text-zinc-600">
                {session.speaker} · {session.room} · {session.durationMinutes} min
              </p>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
              <span className="rounded border border-zinc-200 px-1.5 py-0.5 text-xs text-zinc-700">{session.track}</span>
              <span className="text-xs text-zinc-500">{session.level}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
