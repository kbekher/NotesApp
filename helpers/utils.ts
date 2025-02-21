export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const [month, day] = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
    .format(date)
    .split(' ');

  return { month, day };
};