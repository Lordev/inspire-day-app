import { format } from 'date-fns';

const toDate = (d?: Date | string | number | null): Date | null => {
  if (d instanceof Date) return d;
  if (typeof d === 'number') return new Date(d);
  if (typeof d === 'string' && d !== '') return new Date(d);
  return null;
};

export const formatDate = (date?: Date | string | number | null): string => {
  const dt = toDate(date);
  if (!dt || isNaN(dt.getTime())) {
    return '';
  }
  return format(dt, 'EEEE, MMMM d, yyyy');
};
