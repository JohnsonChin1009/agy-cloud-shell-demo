import type { EventInfo } from '../types';

export function EventHeader({ event }: { event: EventInfo }) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal-700">Event dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{event.name}</h1>
          <p className="mt-1 max-w-xl text-sm text-zinc-600">{event.tagline}</p>
        </div>
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="text-zinc-500">Dates</dt>
            <dd className="font-medium">{event.dates}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Venue</dt>
            <dd className="font-medium">
              {event.venue}, {event.city}
            </dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
