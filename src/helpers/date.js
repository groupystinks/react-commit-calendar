export const totalWeeks = 53;

export function getDateByDays(date, days) {
  const target = new Date(date);
  target.setDate(date.getDate() + days);
  return target;
}
