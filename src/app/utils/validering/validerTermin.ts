import moment from 'moment';
import { isEmpty } from 'lodash';

import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';

const validerTermin = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};
    let barn = {};

    const today = moment().startOf('day');
    if (søknad.barn.fødselsdato && moment(søknad.barn.fødselsdato).isAfter(today)) {
        barn = {
            fødselsdato: 'Fødselsdato må være tilbake i tid',
        };
    }

    if (søknad.barn.termindato === undefined) {
        barn = {
            termindato: 'Termindato er påkrevd',
        };
    }

    if (!isEmpty(barn)) {
        errors.barn = barn;
    }

    return errors;
};

export default validerTermin;
