export const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const range = (end:number) => {
  const { result } = Array.from({ length: end }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + 1
    }),
    { result: [], current: 1 }
  );
  return result;
};

export const sortDays = (date:Date) => {
  const dayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const sortedDays = [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
  return sortedDays;
};

export const nextMonth = (date:Date, currentDateSetter:(date:Date)=>void) => {
  const mon = date.getMonth();
  if (mon < 11) {
    date.setMonth(mon + 1);
  } else {
    date.setMonth(0);
    date.setFullYear(date.getFullYear() + 1);
  }
  currentDateSetter(new Date(date))
  return date;
};

export const prevMonth = (date:Date, currentDateSetter:(date:Date)=>void) => {
  const mon = date.getMonth();
  if (mon > 0) {
    date.setMonth(mon - 1);
  } else {
    date.setMonth(11);
    date.setFullYear(date.getFullYear() - 1);
  }
  currentDateSetter(new Date(date))
  return date;
};
export function formatDate(date:Date) {
  const options = { year: 'numeric', month: 'short' };
  return date.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
}

export const getSortedDays = (date:Date) => {
  const daysInMonth = range(31);
  const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return [...Array(index === 0 ? 6 : index - 1), ...daysInMonth];
};