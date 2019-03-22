import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import moment from 'moment';

const validerIntro = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};

    if (søknad.harGodkjentVilkår === false) {
        errors.harGodkjentVilkår = 'Du må godkjenne vilkårene for å kunne fortsette med søknaden.';
    }

    const today = moment().startOf('day');
    if (søknad.barn.fødselsdato && moment(søknad.barn.fødselsdato).isAfter(today)) {
        errors.barn = {
            fødselsdato: 'Fødselsdato må være tilbake i tid',
        };
    }

    return errors;
};

export default validerIntro;
