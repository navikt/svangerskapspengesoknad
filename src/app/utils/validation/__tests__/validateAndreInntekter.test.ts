import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/types/AnnenInntekt';
import validateAndreInntekter from '../validateAndreInntekter';
import Valideringsfeil from 'app/types/Valideringsfeil';
import { FormikErrors } from 'formik';

describe('andre inntekter modal', () => {
    const annenInntekt: Partial<AnnenInntekt> = {};
    const validator = validateAndreInntekter();

    it('type should be required', () => {
        expect(validator(annenInntekt).type).toBe(Valideringsfeil.FELTET_ER_PÅKREVD);
    });

    it('arbeidsgiverLand and land is required if annen inntekt type is jobb i utlandet', () => {
        annenInntekt.type = AnnenInntektType.JOBB_I_UTLANDET;
        const result = validator(annenInntekt) as FormikErrors<JobbIUtlandetInntekt>;
        expect(result.arbeidsgiverNavn).toBe(Valideringsfeil.FELTET_ER_PÅKREVD);
        expect(result.land).toBe(Valideringsfeil.FELTET_ER_PÅKREVD);
    });
});
