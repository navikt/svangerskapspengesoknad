import moment from 'moment';
import { isEmpty } from 'lodash';

import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';

const validateTermin = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};
    let barn = {};

    const tomorrow = moment()
        .startOf('day')
        .add(1, 'day');
    if (søknad.barn.fødselsdato && !moment(søknad.barn.fødselsdato).isBefore(tomorrow)) {
        barn = {
            fødselsdato: Valideringsfeil.FØDSELSDATO_MÅ_VÆRE_TILBAKE_I_TID
        };
    }

    if (søknad.barn.termindato === undefined) {
        barn = {
            termindato: Valideringsfeil.TERMINDATO_ER_PÅKREVD
        };
    }

    if (!isEmpty(barn)) {
        errors.barn = barn;
    }

    return errors;
};

export default validateTermin;
