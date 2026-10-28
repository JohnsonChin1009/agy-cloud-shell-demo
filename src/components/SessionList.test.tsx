import { render, screen, within } from '@testing-library/react';
import { SessionList } from './SessionList';
import { sessions } from '../data/event';

describe('SessionList', () => {
  it('renders every session with its speaker', () => {
    render(<SessionList sessions={sessions} />);

    const list = screen.getByRole('list', { name: 'Sessions' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(sessions.length);
    expect(screen.getByText('Pairing with Coding Agents in the Terminal')).toBeInTheDocument();
    expect(screen.getByText(/Daniel Reyes/)).toBeInTheDocument();
  });

  it('shows a search field', () => {
    render(<SessionList sessions={sessions} />);

    expect(screen.getByRole('searchbox', { name: 'Search sessions' })).toBeInTheDocument();
  });

  // TODO(workshop): add UI tests for searching, case-insensitive matching and the empty state.
});
