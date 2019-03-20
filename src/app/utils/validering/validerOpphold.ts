import { InjectedIntl } from 'react-intl';
import moment from 'moment';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import getMessage from 'common/util/i18nUtils';
import { Tidsperiode } from 'app/types/Tidsperiode';
import removeUndefinedFields from '../removeUndefinedFields';
import { FormikErrors } from 'formik';

export const getDatoAvgrensninger = (type: Oppholdstype, fom: Date, tom: Date) => {
    const today = new Date();

    return type === Oppholdstype.TIDLIGERE_OPPHOLD
        ? {
              fom: {
                  maksDato: moment.min([moment(today), moment(tom)]).toDate(),
              },
              tom: {
                  minDato: fom,
                  maksDato: today,
              },
          }
        : {
              fom: {
                  minDato: today,
                  maksDato: tom,
              },
              tom: {
                  minDato: moment.max([moment(today), moment(fom)]).toDate(),
              },
          };
};

const validerPeriode = (
    { fom, tom }: Tidsperiode,
    type: Oppholdstype,
    intl: InjectedIntl
): FormikErrors<Tidsperiode> => {
    let errors: any = {};
    const today = moment().startOf('day');

    if (!fom) {
        errors.fom = getMessage(intl, 'feil.annet.påkrevd');
    } else {
        if (type === Oppholdstype.TIDLIGERE_OPPHOLD && moment(fom).isAfter(today)) {
            errors.fom = getMessage(intl, 'feil.utenlandsopphold.tidligereOpphold.måVæreTilbakeITid');
        } else if (type === Oppholdstype.SENERE_OPPHOLD && moment(fom).isBefore(today)) {
            errors.fom = getMessage(intl, 'feil.utenlandsopphold.tidligereOpphold.måVæreFremoverITid');
        }
    }

    if (!tom) {
        errors.tom = getMessage(intl, 'feil.annet.påkrevd');
    } else {
        if (moment(tom).isBefore(fom)) {
            errors.tom = getMessage(intl, 'feil.utenlandsopphold.tidsreiserIkkeTillatt');
        }
    }

    return Object.keys(errors).length > 0 ? errors : undefined;
};

const validerOpphold = (type: Oppholdstype, intl: InjectedIntl) => (
    opphold: Utenlandsopphold
): FormikErrors<Utenlandsopphold> => {
    const errors: FormikErrors<Utenlandsopphold> = {
        periode: validerPeriode(opphold.periode, type, intl),
    };

    if (opphold.land === '') {
        errors.land = getMessage(intl, 'feil.annet.påkrevd');
    }

    return removeUndefinedFields(errors);
};

export default validerOpphold;
