# Project Specification: Harbor DevConf Dashboard

A small, single-page dashboard for an imaginary developer event. It is the starter
project for a hands-on AGY workshop, so it is intentionally small and has one
unfinished feature (see [Session search](#session-search-workshop-challenge)).

## Scope

- Front-end only. No backend, database, API calls, environment variables or secrets.
- All data is seeded mock data in `src/data/event.ts`. Every name is fictional.
- Must run in Google Cloud Shell and be viewable through Web Preview on port 5173.

## Stack

| Concern    | Choice                                           |
| ---------- | ------------------------------------------------ |
| UI         | React 19 + TypeScript (strict)                   |
| Build/dev  | Vite 6                                           |
| Styling    | Tailwind CSS 4 via `@tailwindcss/vite`           |
| Tests      | Vitest 5 + React Testing Library + jsdom         |
| Packages   | npm with a committed `package-lock.json`         |
| Runtime    | Node.js 22.12 or newer (see `.nvmrc`)            |

## Architecture

```
index.html                  Vite entry HTML
vite.config.ts              Dev server (0.0.0.0:5173, *.cloudshell.dev allowed) + Vitest config
src/
  main.tsx                  React root
  App.tsx                   Page layout: header, stats, sessions, activity
  index.css                 Tailwind import and theme tokens
  types.ts                  Shared types: EventInfo, EventStats, Session, Activity
  data/event.ts             Seeded mock data
  lib/
    format.ts               Number, percentage and relative-time helpers
    filterSessions.ts       Session search logic (WORKSHOP CHALLENGE: unfinished)
  components/
    EventHeader.tsx         Event name, tagline, dates, venue
    StatsGrid.tsx           Summary stat cards
    SessionList.tsx         Sessions list with search field (WORKSHOP CHALLENGE: unfinished)
    ActivityFeed.tsx        Recent attendee activity
  test/setup.ts             jest-dom matchers for Vitest
```

Tests live next to the code they cover as `*.test.ts` / `*.test.tsx`.

Data flows one way: `App` imports mock data and passes it to presentational
components as props. Only `SessionList` holds local state (the search query).

## Features

### Event overview
Header showing the event name, tagline, dates and venue.

### Summary statistics
Four cards: registered (with % of capacity), checked in (with % of registered),
sessions (with number of distinct tracks) and speakers.

### Upcoming sessions
List of sessions showing start time, title, speaker, room, duration, track and level.
On small screens, track and level are hidden.

### Recent activity
Reverse-chronological list of attendee events (registered, checked in, joined a
session, left feedback) with a relative timestamp.

## Session search (workshop challenge)

**Status: not implemented in the starter.** The search field is rendered and stores
its value, but `filterSessions` ignores the query, so the list never changes.

Required behavior:

1. A search field in the sessions section, labelled "Search sessions" (already present).
2. Typing filters the displayed sessions immediately, with no submit button.
3. A session matches when the query appears in its **title** or **speaker name**.
4. Matching is **case-insensitive**.
5. An empty or whitespace-only query shows all sessions.
6. Sessions keep their original order.
7. When nothing matches, show a helpful **empty state** instead of an empty list.
   It should tell the user that nothing matched and suggest what to try.
8. Tests cover, at minimum: matching (title and speaker), case insensitivity, and
   no results / empty state.

Where to work:

- `src/lib/filterSessions.ts`: filtering logic.
- `src/components/SessionList.tsx`: the empty state.
- `src/lib/filterSessions.test.ts` and `src/components/SessionList.test.tsx`: tests.
  The `it.todo(...)` placeholders mark the expected cases.

Out of scope: debouncing, URL query params, fuzzy matching, filtering by track or level.

## Non-goals

Routing, authentication, persistence, real-time data, deployment configuration.
