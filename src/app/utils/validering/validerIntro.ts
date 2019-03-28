import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';

const validerIntro = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};

    if (søknad.harGodkjentVilkår === false) {
        errors.harGodkjentVilkår = Valideringsfeil.VILKÅR_MÅ_GODKJENNES;
    }

    return errors;
};

export default validerIntro;
