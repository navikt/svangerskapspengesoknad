import { FormikErrors } from 'formik';
import { FrilansOppdrag } from 'app/types/FrilansInformasjon';
import Valideringsfeil from 'app/types/Valideringsfeil';

type FrilansoppdragFeil = FormikErrors<FrilansOppdrag>;

const validateFrilansoppdrag = () => (frilansOppdrag: Partial<FrilansOppdrag>): FrilansoppdragFeil => {
    const errors: FrilansoppdragFeil = {};

    if (frilansOppdrag.navnPåArbeidsgiver === undefined || frilansOppdrag.navnPåArbeidsgiver === '') {
        errors.navnPåArbeidsgiver = Valideringsfeil.FELTET_ER_PÅKREVD;
    }

    if (frilansOppdrag.navnPåArbeidsgiver !== undefined && frilansOppdrag.navnPåArbeidsgiver.length > 100) {
        errors.navnPåArbeidsgiver = Valideringsfeil.FELTET_KAN_VÆRE_MAX_100_TEGN;
    }

    if (
        frilansOppdrag.tidsperiode === undefined ||
        (frilansOppdrag.tidsperiode !== undefined && frilansOppdrag.tidsperiode.fom === undefined)
    ) {
        errors.tidsperiode = { fom: Valideringsfeil.FELTET_ER_PÅKREVD };
    }

    return errors;
};
export default validateFrilansoppdrag;
