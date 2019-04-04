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
            'harJobbetForNærVennEllerFamilieSiste10Mnd',
        ];

        if (frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd) {
            relevanteFeilter.push('oppdragForNæreVennerEllerFamilieSiste10Mnd');
        }
    }

    return _.pick(frilansInformasjon, relevanteFeilter);
};

export const normaliserNæring = (næring: Partial<Næring>): DeepPartial<Næring> => {
    let relevanteFeilter: string[] = [
        'næringstyper',
        'navnPåNæringen',
        'registrertINorge',
        'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
        'tidsperiode',
        'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
        'kanInnhenteOpplsyningerFraRevisor',
        'harRevisor',
        'harRegnskapsfører',
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
        relevanteFeilter.push('revisor');
    }
    return _.pick(næring, relevanteFeilter);
};
