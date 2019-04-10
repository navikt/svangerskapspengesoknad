import moment from 'moment';
import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';
import { FormikErrors } from 'formik';

const validateTilrettelegging = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: Søknadfeil = {};

    søknad.tilrettelegging.forEach((t, index) => {
        let tErrors: FormikErrors<any> = {};
        if (t.delvisTilrettelegging) {
            if (t.delvisTilrettelegging.stillingsprosent < 0 || t.delvisTilrettelegging.stillingsprosent > 100) {
                tErrors.stillingsprosent = Valideringsfeil.STILLINGSPROSENT_RANGE;
            }
            if (
                t.delvisTilrettelegging.tilrettelagtArbeidFom &&
                moment(t.delvisTilrettelegging.tilrettelagtArbeidFom).isBefore(t.behovForTilretteleggingFom)
            ) {
                tErrors.tilrettelagtArbeidFom = Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG;
            }
        }
        if (t.helTilrettelegging) {
            if (
                t.helTilrettelegging.tilrettelagtArbeidFom &&
                moment(t.helTilrettelegging.tilrettelagtArbeidFom).isBefore(t.behovForTilretteleggingFom)
            ) {
                tErrors.tilrettelagtArbeidFom = Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG;
            }
        }
        if (Object.keys(tErrors).length > 0) {
            if (!errors.tilrettelegging) {
                errors.tilrettelegging = [];
            }
            errors.tilrettelegging.push(tErrors);
        }
    });

    return errors;
};

export default validateTilrettelegging;
