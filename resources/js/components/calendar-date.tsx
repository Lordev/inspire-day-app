import React from 'react';

type CalendarDateProps = {
  date?: string | Date | number | null;
  className?: string;
};

export default function CalendarDate({ date = new Date(), className = '' }: CalendarDateProps) {
  const toDate = (d?: string | Date | number | null) => {
    if (d instanceof Date) return d;
    if (typeof d === 'number') return new Date(d);
    if (typeof d === 'string' && d !== '') return new Date(d);
    return new Date();
  };

  let dt = toDate(date);
  if (isNaN(dt.getTime())) dt = new Date();

  const weekday = dt.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
  const day = String(dt.getDate()).padStart(2, '0');

  return (
    <div
      role="img"
      aria-label={`Date ${weekday} ${day}`}
      className={`inline-flex flex-col items-center justify-center w-14 h-24 rounded-lg border px-8 py-1 ${className} bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700`}
    >
      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{weekday}</span>
      <span className="mt-1 text-2xl font-bold leading-none text-gray-900 dark:text-white">{day}</span>
    </div>
  );
}
