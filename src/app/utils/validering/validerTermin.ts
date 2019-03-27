import moment from 'moment';
import { isEmpty } from 'lodash';

import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';

const validerTermin = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};
    let barn = {};

    const tomorrow = moment()
        .startOf('day')
        .add(1, 'day');
    if (søknad.barn.fødselsdato && !moment(søknad.barn.fødselsdato).isBefore(tomorrow)) {
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
