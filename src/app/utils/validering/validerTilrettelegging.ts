import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';

const validerTilrettelegging = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};

    errors.tilrettelegging = [];

    for (const t of søknad.tilrettelegging) {
        let tErrors: any = {};

        if (t.type === Tilretteleggingstype.DELVIS) {
            if (t.stillingsprosent < 0 || t.stillingsprosent > 100) {
                tErrors.stillingsprosent = 'Må være mellom 0 og 100';
            }
        }

        errors.tilrettelegging.push(tErrors);
    }

    return errors;
};

export default validerTilrettelegging;
