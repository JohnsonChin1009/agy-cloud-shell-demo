// Seeded mock data for an imaginary event. All names are fictional.
import type { Activity, EventInfo, EventStats, Session } from '../types';

export const eventInfo: EventInfo = {
  name: 'Harbor DevConf 2026',
  tagline: 'Two days of talks and workshops on building developer tools.',
  dates: 'Nov 12–13, 2026',
  venue: 'Pier 9 Convention Hall',
  city: 'Port Alder',
};

export const eventStats: EventStats = {
  registered: 1248,
  capacity: 1500,
  checkedIn: 873,
  sessions: 8,
  speakers: 8,
};

export const sessions: Session[] = [
  {
    id: 's1',
    title: 'Keynote: The Next Decade of Developer Tooling',
    speaker: 'Maya Okafor',
    track: 'Keynote',
    room: 'Main Hall',
    startTime: '09:00',
    durationMinutes: 45,
    level: 'Beginner',
  },
  {
    id: 's2',
    title: 'Pairing with Coding Agents in the Terminal',
    speaker: 'Daniel Reyes',
    track: 'AI Tools',
    room: 'Room A',
    startTime: '10:00',
    durationMinutes: 40,
    level: 'Intermediate',
  },
  {
    id: 's3',
    title: 'Type-Safe APIs with TypeScript',
    speaker: 'Priya Natarajan',
    track: 'Web',
    room: 'Room B',
    startTime: '10:00',
    durationMinutes: 40,
    level: 'Intermediate',
  },
  {
    id: 's4',
    title: 'Observability for Small Teams',
    speaker: 'Tomás Lindqvist',
    track: 'Platform',
    room: 'Room C',
    startTime: '11:00',
    durationMinutes: 30,
    level: 'Beginner',
  },
  {
    id: 's5',
    title: 'Testing React Components Without the Pain',
    speaker: 'Hana Kobayashi',
    track: 'Web',
    room: 'Room B',
    startTime: '11:30',
    durationMinutes: 40,
    level: 'Beginner',
  },
  {
    id: 's6',
    title: 'Designing CLIs People Enjoy Using',
    speaker: 'Samuel Adeyemi',
    track: 'AI Tools',
    room: 'Room A',
    startTime: '13:30',
    durationMinutes: 40,
    level: 'Intermediate',
  },
  {
    id: 's7',
    title: 'Zero-Downtime Database Migrations',
    speaker: 'Elena Petrova',
    track: 'Platform',
    room: 'Room C',
    startTime: '14:30',
    durationMinutes: 45,
    level: 'Advanced',
  },
  {
    id: 's8',
    title: 'Workshop: Cloud Development Environments',
    speaker: 'Lucas Moreau',
    track: 'Workshop',
    room: 'Lab 1',
    startTime: '15:30',
    durationMinutes: 90,
    level: 'Beginner',
  },
];

export const recentActivity: Activity[] = [
  { id: 'a1', attendee: 'Grace Liu', type: 'checked-in', detail: 'Checked in at Gate 2', minutesAgo: 2 },
  {
    id: 'a2',
    attendee: 'Omar Haddad',
    type: 'joined-session',
    detail: 'Joined “Pairing with Coding Agents in the Terminal”',
    minutesAgo: 5,
  },
  { id: 'a3', attendee: 'Sofia Rossi', type: 'registered', detail: 'Registered for a 2-day pass', minutesAgo: 12 },
  {
    id: 'a4',
    attendee: 'Kwame Mensah',
    type: 'left-feedback',
    detail: 'Rated the keynote 5/5',
    minutesAgo: 18,
  },
  { id: 'a5', attendee: 'Ines Duarte', type: 'checked-in', detail: 'Checked in at Gate 1', minutesAgo: 26 },
  {
    id: 'a6',
    attendee: 'Arjun Mehta',
    type: 'joined-session',
    detail: 'Joined “Type-Safe APIs with TypeScript”',
    minutesAgo: 41,
  },
  { id: 'a7', attendee: 'Lena Fischer', type: 'registered', detail: 'Registered for Day 2', minutesAgo: 75 },
];
