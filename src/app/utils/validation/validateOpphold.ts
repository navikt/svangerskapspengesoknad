import moment from 'moment';
import { FormikErrors } from 'formik';

import { Tidsperiode } from 'app/types/Tidsperiode';
import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import Valideringsfeil from 'app/types/Valideringsfeil';
import isEmpty from 'lodash/isEmpty';

type Oppholdsfeil = FormikErrors<Utenlandsopphold>;

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

const validatePeriode = ({ fom, tom }: Tidsperiode, type: Oppholdstype): Oppholdsfeil => {
    let errors: FormikErrors<Tidsperiode> = {};
    const today = moment().startOf('day');

    if (!fom) {
        errors.fom = Valideringsfeil.FELTET_ER_PÅKREVD;
    } else {
        if (type === Oppholdstype.TIDLIGERE_OPPHOLD && moment(fom).isAfter(today)) {
            errors.fom = Valideringsfeil.TIDLIGERE_OPPHOLD_MÅ_VÆRE_TILBAKE_I_TID;
        } else if (type === Oppholdstype.SENERE_OPPHOLD && moment(fom).isBefore(today)) {
            errors.fom = Valideringsfeil.TIDLIGERE_OPPHOLD_MÅ_VÆRE_FREMOVER_I_TID;
        }
    }

    if (!tom) {
        errors.tom = Valideringsfeil.FELTET_ER_PÅKREVD;
    } else {
        if (moment(tom).isBefore(fom)) {
            errors.tom = Valideringsfeil.TIDSREISER_IKKE_TILLATT;
        }
    }

    return !isEmpty(errors) ? { periode: errors } : {};
};

const validateOpphold = (type: Oppholdstype) => (opphold: Utenlandsopphold): Oppholdsfeil => {
    const errors: Oppholdsfeil = {
        ...validatePeriode(opphold.periode, type),
    };

    if (opphold.land === '') {
        errors.land = Valideringsfeil.FELTET_ER_PÅKREVD;
    }

    return errors;
};

export default validateOpphold;
