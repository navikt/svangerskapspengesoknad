import { FormikErrors } from 'formik';
import { FrilansOppdrag } from 'app/types/FrilansInformasjon';

type FrilansoppdragFeil = FormikErrors<FrilansOppdrag>;

const validateFrilansoppdrag = () => (frilansOppdrag: Partial<FrilansOppdrag>): FrilansoppdragFeil => {
    const errors: FrilansoppdragFeil = {};

    if (frilansOppdrag.navnPåArbeidsgiver === undefined || frilansOppdrag.navnPåArbeidsgiver === '') {
        errors.navnPåArbeidsgiver = 'valideringsfeil.feltetErPåkrevd';
    }

    if (frilansOppdrag.navnPåArbeidsgiver !== undefined && frilansOppdrag.navnPåArbeidsgiver.length > 100) {
        errors.navnPåArbeidsgiver = 'valideringsfeil.feltetKanVæreMax100Tegn';
    }

    if (
        frilansOppdrag.tidsperiode === undefined ||
        (frilansOppdrag.tidsperiode !== undefined && frilansOppdrag.tidsperiode.fom === undefined)
    ) {
        errors.tidsperiode = { fom: 'valideringsfeil.feltetErPåkrevd' };
    }

    return errors;
};
export default validateFrilansoppdrag;
