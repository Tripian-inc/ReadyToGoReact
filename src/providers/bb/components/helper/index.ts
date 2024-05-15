export const durationFormat = (duration: number) => {
  const hours = duration / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours} Hour${rhours > 1 ? 's' : ''} ${rminutes > 0 ? `, ${rminutes} Mins` : ''}`;
};
