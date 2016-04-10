export const totalWeeks = 53;

export const today = new Date();
export const todayInWeek = today.getDay();

export function getDateByDays(date, days) {
  const target = new Date(date);
  target.setDate(date.getDate() + days);
  return target;
}

export const lastYearToday = getDateByDays(today, -364);
export const lastYearTodayInWeek = lastYearToday.getDay();
