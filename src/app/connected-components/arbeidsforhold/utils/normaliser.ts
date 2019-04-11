import { Søker } from 'app/types/Søker';
import _ from 'lodash';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import { DeepPartial } from 'redux';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import moment from 'moment';

export const normaliserFrilansinformasjon = (søker: Partial<Søker>): DeepPartial<FrilansInformasjon> => {
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

export const normaliserNæring = (næring: Partial<Næring>): DeepPartial<Næring> => {
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

    næring.tidsperiode && moment(næring.tidsperiode.fom as Date).isBefore(moment().subtract(4, 'year'))
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

export const normaliserSøker = (søker: Partial<Søker>) => {
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
        relevanteFeilter.push('andreINntekterSiste10Mnd');
    }

    return _.pick(søker, relevanteFeilter);
};
