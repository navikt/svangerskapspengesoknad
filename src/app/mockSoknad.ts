import { UferdigSøknad } from './types/Søknad';
import moment from 'moment';
import { Søkerrolle } from './types/Søker';
import { Arbeidsforholdstype, Tilretteleggingstype } from './types/Tilrettelegging';

const mockSøknad: UferdigSøknad = {
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    barn: {
        termindato: moment('2019-04-11T00:00:00.000Z').toDate(),
        erBarnetFødt: false
    },
    tilrettelegging: [
        {
            id: '973861778',
            vedlegg: ['V20660387026295873109468060050833209350'],
            behovForTilretteleggingFom: new Date(),
            type: [Tilretteleggingstype.HEL],
            arbeidsforhold: {
                id: '973861778',
                type: Arbeidsforholdstype.VIRKSOMHET
            }
        },
        {
            id: 'Frilans',
            vedlegg: [],
            behovForTilretteleggingFom: new Date(),
            type: [Tilretteleggingstype.HEL],
            arbeidsforhold: {
                type: Arbeidsforholdstype.FRILANSER
            }
        }
    ],
    søknadsgrunnlag: [
        {
            id: '973861778',
            type: Arbeidsforholdstype.VIRKSOMHET
        },
        {
            id: 'Frilans',
            type: Arbeidsforholdstype.FRILANSER
        }
    ],
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        tidligereOpphold: [],
        senereOpphold: []
    },
    søker: {
        rolle: Søkerrolle.MOR,
        selvstendigNæringsdrivendeInformasjon: [],
        andreInntekterSiste10Mnd: [],
        harJobbetSomFrilansSiste10Mnd: true,
        frilansInformasjon: {
            oppstart: moment('2019-04-21T00:00:00.000Z').toDate(),
            jobberFremdelesSomFrilans: true,
            harJobbetForNærVennEllerFamilieSiste10Mnd: false,
            driverFosterhjem: true
        },
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
    }
};
export default mockSøknad;
