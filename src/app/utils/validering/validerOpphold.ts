import { InjectedIntl } from 'react-intl';
import moment from 'moment';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import getMessage from 'common/util/i18nUtils';
import { Tidsperiode } from 'app/types/Tidsperiode';
import removeUndefinedFields from '../removeUndefinedFields';

export const getDatoAvgrensninger = (type: Oppholdstype, fom: Date, tom: Date) => {
    const today = new Date();

    return type === Oppholdstype.TIDLIGERE_OPPHOLD
        ? {
              fom: {
                  maksDato: moment.min([moment(today), moment(tom).subtract(1, 'day')]).toDate(),
              },
              tom: {
                  minDato: moment(fom)
                      .add(1, 'day')
                      .toDate(),
                  maksDato: today,
              },
          }
        : {
              fom: {
                  minDato: today,
                  maksDato: tom
                      ? moment(tom)
                            .subtract(1, 'day')
                            .toDate()
                      : undefined,
              },
              tom: {
                  minDato: moment.max([moment(today), moment(fom).add(1, 'day')]).toDate(),
              },
          };
};

const validerPeriode = ({ fom, tom }: Tidsperiode, type: Oppholdstype, intl: InjectedIntl) => {
    let errors: any = {};
    const today = moment();

    if (!fom) {
        errors.fom = getMessage(intl, 'feil.annet.påkrevd');
    } else {
        if (type === Oppholdstype.TIDLIGERE_OPPHOLD && moment(fom).isSameOrAfter(today)) {
            errors.fom = getMessage(intl, 'feil.utenlandsopphold.tidligereOpphold.måVæreTilbakeITid');
        } else if (type === Oppholdstype.SENERE_OPPHOLD && moment(fom).isSameOrBefore(today)) {
            errors.fom = getMessage(intl, 'feil.utenlandsopphold.tidligereOpphold.måVæreFremoverITid');
        }
    }

    if (tom) {
        if (moment(tom).isSameOrBefore(fom)) {
            errors.tom = getMessage(intl, 'feil.utenlandsopphold.tidsreiserIkkeTillatt');
        }
    }

    return Object.keys(errors).length > 0 ? errors : undefined;
};

const validerOpphold = (type: Oppholdstype, intl: InjectedIntl) => (opphold: Utenlandsopphold) => {
    const errors = {
        periode: validerPeriode(opphold.periode, type, intl),
    };

    return removeUndefinedFields(errors);
};

export default validerOpphold;
