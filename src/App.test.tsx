import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('shows the event overview', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Harbor DevConf 2026' })).toBeInTheDocument();
    expect(screen.getByText('Nov 12–13, 2026')).toBeInTheDocument();
  });

  it('shows summary statistics', () => {
    render(<App />);

    const stats = screen.getByRole('region', { name: 'Event statistics' });
    expect(stats).toHaveTextContent('Registered');
    expect(stats).toHaveTextContent('1,248');
    expect(stats).toHaveTextContent('Checked in');
    expect(stats).toHaveTextContent('873');
    expect(stats).toHaveTextContent('Across 5 tracks');
  });

  it('shows sessions and recent activity', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Upcoming sessions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent activity' })).toBeInTheDocument();
    expect(screen.getByText('Grace Liu')).toBeInTheDocument();
  });
});
