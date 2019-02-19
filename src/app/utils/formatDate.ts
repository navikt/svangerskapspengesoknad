import moment from 'moment';

export const dateToHours = (date: Date) => moment(date).format('HH:mm');
