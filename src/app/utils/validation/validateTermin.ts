import moment from 'moment';
import { isEmpty } from 'lodash';

import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';

const validateTermin = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};
    let barn = {};

    const tomorrow = moment().startOf('day').add(1, 'day');
    const nineMonthsAhead = moment().startOf('day').add(9, 'months');
    const aYearAgo = moment().startOf('day').subtract(1, 'year');
    if (søknad.barn.fødselsdato) {
        if (!moment(søknad.barn.fødselsdato).isBefore(tomorrow)) {
            barn = {
                fødselsdato: Valideringsfeil.FØDSELSDATO_MÅ_VÆRE_TILBAKE_I_TID,
            };
        }

        if (moment(søknad.barn.fødselsdato).isBefore(aYearAgo)) {
            barn = {
                fødselsdato: Valideringsfeil.FOR_LANGT_TILBAKE_I_TID,
            };
        }
    }

    if (søknad.barn.termindato === undefined) {
        barn = {
            termindato: Valideringsfeil.TERMINDATO_ER_PÅKREVD,
        };
    }

    if (søknad.barn.termindato) {
        if (moment(søknad.barn.termindato).isSameOrAfter(nineMonthsAhead)) {
            barn = {
                termindato: Valideringsfeil.FOR_LANGT_FREM_I_TID,
            };
        }

        if (moment(søknad.barn.termindato).isBefore(aYearAgo)) {
            barn = {
                termindato: Valideringsfeil.FOR_LANGT_TILBAKE_I_TID,
            };
        }
    }

    if (!isEmpty(barn)) {
        errors.barn = barn;
    }

    return errors;
};

export default validateTermin;
