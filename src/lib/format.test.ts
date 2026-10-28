import { formatNumber, formatRelativeTime, percentOf } from './format';

describe('formatNumber', () => {
  it('adds thousands separators', () => {
    expect(formatNumber(1248)).toBe('1,248');
  });
});

describe('percentOf', () => {
  it('returns a rounded percentage', () => {
    expect(percentOf(873, 1248)).toBe(70);
  });

  it('returns 0 when the total is 0', () => {
    expect(percentOf(5, 0)).toBe(0);
  });
});

describe('formatRelativeTime', () => {
  it.each([
    [0, 'just now'],
    [5, '5 min ago'],
    [60, '1 hr ago'],
    [150, '2 hrs ago'],
  ])('formats %i minutes as "%s"', (minutes, expected) => {
    expect(formatRelativeTime(minutes)).toBe(expected);
  });
});
