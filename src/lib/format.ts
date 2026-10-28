export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/** Returns a whole-number percentage, e.g. percentOf(873, 1248) === 70. */
export function percentOf(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

export function formatRelativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return 'just now';
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hours = Math.floor(minutesAgo / 60);
  return hours === 1 ? '1 hr ago' : `${hours} hrs ago`;
}
