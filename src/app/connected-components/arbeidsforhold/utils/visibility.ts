import { Næring, Næringstype } from 'app/types/SelvstendigNæringsdrivende';
import { cleanupNæring } from './cleanup';
import * as moment from 'moment';

export const visKomponentSelvstendigNæringsdrivende = (næring: Partial<Næring>): { [key: string]: boolean } => {
    const normalisertNæring = cleanupNæring(næring);
    const {
        næringstyper,
        navnPåNæringen,
        registrertINorge,
        organisasjonsnummer,
        registrertILand,
        tidsperiode = {},
        næringsinntekt,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        oppstartsdato,
        harRegnskapsfører,
        regnskapsfører,
        revisor,
        harRevisor,
        endringAvNæringsinntektInformasjon,
        kanInnhenteOpplsyningerFraRevisor
    } = normalisertNæring;

    const skalViseNavnPåNæringen = næringstyper !== undefined && næringstyper.length! > 0;
    const skalViseAdvarselFikser =
        skalViseNavnPåNæringen && (næringstyper as Næringstype[]).includes(Næringstype.FISKER);
    const skalViseRegistrertINorge = skalViseNavnPåNæringen && navnPåNæringen !== undefined && navnPåNæringen !== '';
    const skalViseLand = skalViseRegistrertINorge && registrertINorge === false;
    const skalViseOrgNr = skalViseRegistrertINorge && registrertINorge === true;
    const skalViseTidsperiode =
        (skalViseLand || skalViseOrgNr) &&
        ((registrertINorge === true && organisasjonsnummer !== undefined && organisasjonsnummer !== '') ||
            registrertILand !== undefined);
    const skalVisevarigEndringAvNæringsinntektBolk =
        tidsperiode !== undefined &&
        tidsperiode.fom !== undefined &&
        tidsperiode.fom !== '' &&
        moment(tidsperiode.fom as Date).isBefore(moment().subtract(4, 'year'));
    const skalViseNæringsinntekt =
        skalViseTidsperiode && !skalVisevarigEndringAvNæringsinntektBolk && tidsperiode.fom !== undefined;
    const skalViseharBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene =
        skalViseNæringsinntekt &&
        !skalVisevarigEndringAvNæringsinntektBolk &&
        næringsinntekt !== undefined &&
        næringsinntekt !== '';
    const skalViseOppstartsdato =
        skalViseharBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene &&
        !skalVisevarigEndringAvNæringsinntektBolk &&
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === true;
    const skalViseHarRegnskapsfører =
        (skalViseharBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene &&
            (oppstartsdato !== undefined && oppstartsdato !== '')) ||
        (skalViseharBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene &&
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === false) ||
        (skalVisevarigEndringAvNæringsinntektBolk &&
            endringAvNæringsinntektInformasjon !== undefined &&
            endringAvNæringsinntektInformasjon.dato !== undefined &&
            endringAvNæringsinntektInformasjon.dato !== '' &&
            endringAvNæringsinntektInformasjon.næringsinntektEtterEndring !== undefined &&
            endringAvNæringsinntektInformasjon.forklaring !== undefined &&
            endringAvNæringsinntektInformasjon.forklaring !== '');
    const skalViseNæringsrelasjonRegnskapsfører = skalViseHarRegnskapsfører && harRegnskapsfører === true;
    const skalViseRevisor = skalViseHarRegnskapsfører && harRegnskapsfører === false;
    const skalViseNæringsrelasjonRevisor = skalViseRevisor && harRevisor === true;
    const skalViseKanInnhenteOpplysningerFraRevisor =
        skalViseNæringsrelasjonRevisor && revisor !== undefined && revisor.erNærVennEllerFamilie !== undefined;
    const skalViseformButtons =
        (harRegnskapsfører === false && harRevisor === false && skalViseRevisor) ||
        (harRegnskapsfører === true &&
            skalViseNæringsrelasjonRegnskapsfører &&
            regnskapsfører !== undefined &&
            regnskapsfører.navn !== undefined &&
            regnskapsfører.navn !== '' &&
            regnskapsfører.telefonnummer !== undefined &&
            regnskapsfører.telefonnummer !== '' &&
            regnskapsfører.erNærVennEllerFamilie !== undefined) ||
        (harRevisor === true &&
            skalViseNæringsrelasjonRevisor &&
            revisor !== undefined &&
            revisor.navn !== undefined &&
            revisor.navn !== '' &&
            revisor.telefonnummer !== undefined &&
            revisor.telefonnummer !== '' &&
            revisor.erNærVennEllerFamilie !== undefined &&
            kanInnhenteOpplsyningerFraRevisor !== undefined);

    return {
        skalViseNavnPåNæringen,
        skalViseAdvarselFikser,
        skalViseRegistrertINorge,
        skalViseLand,
        skalViseOrgNr,
        skalViseTidsperiode,
        skalVisevarigEndringAvNæringsinntektBolk,
        skalViseNæringsinntekt,
        skalViseharBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        skalViseOppstartsdato,
        skalViseHarRegnskapsfører,
        skalViseNæringsrelasjonRegnskapsfører,
        skalViseRevisor,
        skalViseNæringsrelasjonRevisor,
        skalViseKanInnhenteOpplysningerFraRevisor,
        skalViseformButtons
    };
};
