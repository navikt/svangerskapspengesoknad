import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validerIntro from './validerIntro';

const validerSøknad = (søknad: UferdigSøknad): Søknadfeil => {
    const intro: Søknadfeil = validerIntro(søknad);

    return {
        ...intro,
    };
};

export default validerSøknad;
