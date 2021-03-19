import { FormikErrors } from 'formik';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/types/AnnenInntekt';

type AnnenInntektFeil = FormikErrors<AnnenInntekt>;

const validateAndreInntekter = () => (annenInntekt: Partial<AnnenInntekt>): AnnenInntektFeil => {
    const errors: AnnenInntektFeil = {};

    if (annenInntekt.type === undefined || (annenInntekt.type && annenInntekt.type.length === 0)) {
        errors.type = 'valideringsfeil.feltetErPåkrevd';
    }

    if (annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET) {
        if (!annenInntekt.land) {
            (errors as FormikErrors<JobbIUtlandetInntekt>).land = 'valideringsfeil.feltetErPåkrevd';
        }

        if (!annenInntekt.arbeidsgiverNavn) {
            (errors as FormikErrors<JobbIUtlandetInntekt>).arbeidsgiverNavn = 'valideringsfeil.feltetErPåkrevd';
        }

        if (annenInntekt.arbeidsgiverNavn && annenInntekt.arbeidsgiverNavn.length > 100) {
            (errors as FormikErrors<JobbIUtlandetInntekt>).arbeidsgiverNavn = 'valideringsfeil.feltetKanVæreMax100Tegn';
        }

        if (
            annenInntekt.tidsperiode === undefined ||
            (annenInntekt.tidsperiode !== undefined && annenInntekt.tidsperiode.fom === undefined)
        ) {
            errors.tidsperiode = { fom: 'valideringsfeil.feltetErPåkrevd' };
        }
    }
    return errors;
};
export default validateAndreInntekter;
