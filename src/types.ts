export interface EventInfo {
  name: string;
  tagline: string;
  dates: string;
  venue: string;
  city: string;
}

export interface EventStats {
  registered: number;
  capacity: number;
  checkedIn: number;
  sessions: number;
  speakers: number;
}

export type SessionLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Session {
  id: string;
  title: string;
  speaker: string;
  track: string;
  room: string;
  /** 24-hour local time, e.g. "09:30". */
  startTime: string;
  durationMinutes: number;
  level: SessionLevel;
}

export type ActivityType = 'registered' | 'checked-in' | 'joined-session' | 'left-feedback';

export interface Activity {
  id: string;
  attendee: string;
  type: ActivityType;
  detail: string;
  minutesAgo: number;
}
