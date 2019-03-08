import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validerIntro from './validerIntro';

const validerSøknad = (søknad: UferdigSøknad): Søknadfeil => {
    console.log('Søknad now:', søknad);
    const intro: Søknadfeil = validerIntro(søknad);

    const errors = {
        ...intro,
    };

    return errors;
};

export default validerSøknad;
