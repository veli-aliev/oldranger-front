import { formatDistance, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';

// eslint-disable-next-line import/prefer-default-export
export const dateToDateDistance = isoDate =>
  isoDate && formatDistance(parseISO(isoDate), new Date(), { locale: ru });
