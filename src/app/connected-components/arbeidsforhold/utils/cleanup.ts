import { Søker } from 'app/types/Søker';
import * as _ from 'lodash';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import { DeepPartial } from 'redux';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import * as moment from 'moment';
import { AnnenInntekt, AnnenInntektType } from 'app/types/AnnenInntekt';

export const cleanupFrilansinformasjon = (søker: Partial<Søker>): DeepPartial<FrilansInformasjon> => {
    const { harJobbetSomFrilansSiste10Mnd, frilansInformasjon } = søker;

    let relevanteFeilter: string[] = [];
    if (harJobbetSomFrilansSiste10Mnd && frilansInformasjon) {
        relevanteFeilter = [
            'jobberFremdelesSomFrilans',
            'oppstart',
            'driverFosterhjem',
            'harJobbetForNærVennEllerFamilieSiste10Mnd'
        ];

        if (frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd) {
            relevanteFeilter.push('oppdragForNæreVennerEllerFamilieSiste10Mnd');
        }
    }

    return _.pick(frilansInformasjon, relevanteFeilter);
};

export const cleanupNæring = (næring: Partial<Næring>): DeepPartial<Næring> => {
    const relevanteFeilter: string[] = [
        'næringstyper',
        'navnPåNæringen',
        'registrertINorge',
        'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
        'tidsperiode',
        'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
        'harRevisor',
        'harRegnskapsfører'
    ];

    næring.registrertINorge === true
        ? relevanteFeilter.push('organisasjonsnummer')
        : relevanteFeilter.push('registrertILand');

    næring.tidsperiode &&
    næring.tidsperiode.fom !== undefined &&
    moment(næring.tidsperiode.fom as Date).isBefore(moment().subtract(4, 'year'))
        ? relevanteFeilter.push('endringAvNæringsinntektInformasjon')
        : relevanteFeilter.push(
              'næringsinntekt',
              'oppstartsdato',
              'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene'
          );

    if (næring.harRegnskapsfører === true) {
        relevanteFeilter.push('regnskapsfører');
    } else if (næring.harRevisor === true) {
        relevanteFeilter.push('revisor', 'kanInnhenteOpplsyningerFraRevisor');
    }
    return _.pick(næring, relevanteFeilter);
};

export const cleanupSøker = (søker: Partial<Søker>) => {
    const relevanteFeilter: string[] = [
        'rolle',
        'harJobbetSomFrilansSiste10Mnd',
        'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd',
        'harHattAnnenInntektSiste10Mnd'
    ];

    if (søker.harJobbetSomFrilansSiste10Mnd) {
        relevanteFeilter.push('frilansInformasjon');
    }

    if (søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        relevanteFeilter.push('selvstendigNæringsdrivendeInformasjon');
    }

    if (søker.harHattAnnenInntektSiste10Mnd) {
        relevanteFeilter.push('andreInntekterSiste10Mnd');
    }

    return _.pick(søker, relevanteFeilter);
};

export const cleanupAnnenInntekt = (annenInntekt: Partial<AnnenInntekt>): AnnenInntekt => {
    annenInntekt.vedlegg = annenInntekt.type === AnnenInntektType.MILITÆRTJENESTE ? annenInntekt.vedlegg : [];
    return annenInntekt as AnnenInntekt;
};
