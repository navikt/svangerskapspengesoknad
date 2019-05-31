import { FormikErrors } from 'formik';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import { erGyldigNorskOrgnummer } from './utils/organisasjonsnummer';
import Valideringsfeil from 'app/types/Valideringsfeil';
import { set } from 'lodash';

type SelvstendigNæringsdrivendeFeil = FormikErrors<Næring>;

const validateSelvstendigNæringsdrivende = () => (næring: Partial<Næring>): SelvstendigNæringsdrivendeFeil => {
    const errors: SelvstendigNæringsdrivendeFeil = {};

    if (næring.navnPåNæringen && næring.navnPåNæringen.length > 100) {
        errors.navnPåNæringen = Valideringsfeil.FELTET_KAN_VÆRE_MAX_100_TEGN;
    }

    if (næring.organisasjonsnummer && !erGyldigNorskOrgnummer(næring.organisasjonsnummer)) {
        errors.organisasjonsnummer =
            næring.organisasjonsnummer.length !== 9
                ? Valideringsfeil.MÅ_BESTÅ_AV_9_SIFFER
                : Valideringsfeil.UGYLDIG_ORGANISASJONSNUMMER;
    }

    if (næring.næringsinntekt && isNaN(Number(næring.næringsinntekt)) || næring.næringsinntekt && (næring.næringsinntekt.includes(',') || næring.næringsinntekt.includes('.'))) {
        errors.næringsinntekt = Valideringsfeil.MÅ_VÆRE_HELTALL;
    }

    if (næring.revisor) {
        const revisor = næring.revisor;
        if (revisor.navn && revisor.navn.length > 100) {
            set(errors, ['revisor', 'navn'], Valideringsfeil.FELTET_KAN_VÆRE_MAX_100_TEGN);
        }
        if (revisor.navn && revisor.telefonnummer.length > 100) {
            set(errors, ['revisor', 'telefonnummer'], Valideringsfeil.FELTET_KAN_VÆRE_MAX_100_TEGN);
        }
    }

    if (næring.regnskapsfører) {
        const regnskapsfører = næring.regnskapsfører;
        if (regnskapsfører.navn && regnskapsfører.navn.length > 100) {
            set(errors, ['regnskapsfører', 'navn'], Valideringsfeil.FELTET_KAN_VÆRE_MAX_100_TEGN);
        }
        if (regnskapsfører.navn && regnskapsfører.telefonnummer.length > 100) {
            set(errors, ['regnskapsfører', 'telefonnummer'], Valideringsfeil.FELTET_KAN_VÆRE_MAX_100_TEGN);
        }
    }

    if (næring.endringAvNæringsinntektInformasjon) {
        if (
            næring.endringAvNæringsinntektInformasjon.forklaring &&
            næring.endringAvNæringsinntektInformasjon.forklaring.length > 1000
        ) {
            set(
                errors,
                ['endringAvNæringsinntektInformasjon', 'forklaring'],
                Valideringsfeil.FELTET_KAN_VÆRE_MAX_1000_TEGN
            );
        }
    }

    return errors;
};
export default validateSelvstendigNæringsdrivende;
