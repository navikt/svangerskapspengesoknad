import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validerIntro from './validerIntro';

const validerSøknad = (søknad: UferdigSøknad): Søknadfeil => {
    const intro: Søknadfeil = validerIntro(søknad);

    const errors = {
        ...intro,
    };

    return errors;
};

export default validerSøknad;
