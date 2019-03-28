import moment from 'moment';

import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';
import Valideringsfeil from 'app/types/Valideringsfeil';

const validerTilrettelegging = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};

    for (const t of søknad.tilrettelegging) {
        let tErrors: any = {};

        if (t.type === Tilretteleggingstype.DELVIS) {
            if (t.stillingsprosent < 0 || t.stillingsprosent > 100) {
                tErrors.stillingsprosent = Valideringsfeil.STILLINGSPROSENT_RANGE;
            }
        }

        if (t.type === Tilretteleggingstype.DELVIS || t.type === Tilretteleggingstype.HEL) {
            if (t.tilrettelagtArbeidFom && moment(t.tilrettelagtArbeidFom).isBefore(t.behovForTilretteleggingFom)) {
                tErrors.tilrettelagtArbeidFom = Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG;
            }
        }

        if (Object.keys(tErrors).length > 0) {
            if (!errors.tilrettelegging) {
                errors.tilrettelegging = [];
            }

            errors.tilrettelegging.push(tErrors);
        }
    }

    return errors;
};

export default validerTilrettelegging;
