import { FormikErrors } from 'formik';

import Valideringsfeil from 'app/types/Valideringsfeil';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/types/AnnenInntekt';

type AnnenInntektFeil = FormikErrors<AnnenInntekt>;

const validateAndreInntekter = () => (annenInntekt: Partial<AnnenInntekt>): AnnenInntektFeil => {
    const errors: AnnenInntektFeil = {};

    if (annenInntekt.type === undefined || (annenInntekt.type && annenInntekt.type.length === 0)) {
        errors.type = Valideringsfeil.FELTET_ER_PÅKREVD;
    }

    if (annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET) {
        if (!annenInntekt.land) {
            (errors as FormikErrors<JobbIUtlandetInntekt>).land = Valideringsfeil.FELTET_ER_PÅKREVD;
        }

        if (!annenInntekt.arbeidsgiverNavn) {
            (errors as FormikErrors<JobbIUtlandetInntekt>).arbeidsgiverNavn = Valideringsfeil.FELTET_ER_PÅKREVD;
        }
    }
    return errors;
};
export default validateAndreInntekter;
