import moment from 'moment';
import { FormikErrors } from 'formik';

import { Tidsperiode } from 'app/types/Tidsperiode';
import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import removeUndefinedFields from '../removeUndefinedFields';
import Valideringsfeil from 'app/types/Valideringsfeil';

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

const validerPeriode = ({ fom, tom }: Tidsperiode, type: Oppholdstype): FormikErrors<Tidsperiode> => {
    let errors: any = {};
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

    return Object.keys(errors).length > 0 ? errors : undefined;
};

const validerOpphold = (type: Oppholdstype) => (opphold: Utenlandsopphold): FormikErrors<Utenlandsopphold> => {
    const errors: FormikErrors<Utenlandsopphold> = {
        periode: validerPeriode(opphold.periode, type),
    };

    if (opphold.land === '') {
        errors.land = Valideringsfeil.FELTET_ER_PÅKREVD;
    }

    return removeUndefinedFields(errors);
};

export default validerOpphold;
