import moment from 'moment';
import { Tidsperiode } from 'common/types';

export const dateToHours = (date: Date) => moment(date).format('HH:mm');

export const formatDate = (dato?: Date | string) => {
    if (dato) {
        const parsetDato = moment(dato);
        return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
    }
    return dato;
};

export const prettifyTidsperiode = (tidsperiode: Partial<Tidsperiode>) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom) || 'pågående'}`;
};
