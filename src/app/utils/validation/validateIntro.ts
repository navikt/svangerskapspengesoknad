import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';

const validateIntro = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};

    if (søknad.harGodkjentVilkår === false) {
        errors.harGodkjentVilkår = Valideringsfeil.VILKÅR_MÅ_GODKJENNES;
    }

    return errors;
};

export default validateIntro;
