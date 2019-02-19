import moment from 'moment';

export const dateToHours = (date: Date) => moment(date).format('HH:mm');

export const formatDate = (dato?: Date | string) => {
    if (dato) {
        const parsetDato = moment(dato);
        return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
    }
    return dato;
};
