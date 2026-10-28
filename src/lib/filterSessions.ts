import type { Session } from '../types';

/**
 * Returns the sessions whose title or speaker name matches `query`.
 *
 * WORKSHOP CHALLENGE — see docs/PROJECT_SPEC.md, "Session search".
 * Expected behavior:
 *   - Match against session title OR speaker name.
 *   - Case-insensitive.
 *   - An empty or whitespace-only query returns every session.
 *   - Preserve the original session order.
 */
export function filterSessions(sessions: Session[], query: string): Session[] {
  // TODO(workshop): implement filtering. Currently ignores the query.
  void query;
  return sessions;
}
