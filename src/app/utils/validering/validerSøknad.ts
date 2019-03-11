import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validerIntro from './validerIntro';
import validerTilrettelegging from './validerTilrettelegging';

const validerSøknad = (søknad: UferdigSøknad): Søknadfeil => {
    const intro: Søknadfeil = validerIntro(søknad);
    const tilrettelegging: Søknadfeil = validerTilrettelegging(søknad);

    const errors = {
        ...intro,
        ...tilrettelegging,
    };

    return errors;
};

export const containsErrors = (item: any): boolean => {
    if (typeof item === 'string' && item !== '') {
        return true;
    } else if (Array.isArray(item)) {
        for (const member of item) {
            if (containsErrors(member)) return true;
        }
    } else if (typeof item === 'object') {
        for (const property in item) {
            if (containsErrors(item[property])) return true;
        }
    }

    return false;
};

export default validerSøknad;
