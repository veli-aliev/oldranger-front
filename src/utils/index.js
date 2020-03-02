import { formatDistance, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';

// eslint-disable-next-line import/prefer-default-export
export const dateToDateDistance = isoDate =>
  isoDate && formatDistance(parseISO(isoDate), new Date(), { locale: ru });

export const mapRoleToString = role => {
  const roles = {
    ROLE_ADMIN: 'Администратор',
    ROLE_MODERATOR: 'Модератор',
    ROLE_USER: 'Пользователь',
    ROLE_PROSPECT: 'Prospect',
  };
  return roles[role];
};
