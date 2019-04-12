import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';

const validateOppsummering = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};

    if (søknad.harGodkjentOppsummering !== true) {
        errors.harGodkjentOppsummering = Valideringsfeil.OPPSUMMERING_MÅ_GODKJENNES;
    }

    return errors;
};

export default validateOppsummering;
