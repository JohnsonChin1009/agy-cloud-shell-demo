import { filterSessions } from './filterSessions';
import { sessions } from '../data/event';

describe('filterSessions', () => {
  it('returns every session for an empty query', () => {
    expect(filterSessions(sessions, '')).toEqual(sessions);
  });

  // TODO(workshop): replace these placeholders with real tests.
  it.todo('matches sessions by title');
  it.todo('matches sessions by speaker name');
  it.todo('ignores letter case');
  it.todo('returns an empty list when nothing matches');
});
