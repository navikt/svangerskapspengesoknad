import Søknad, { Søknadstype } from 'app/types/Søknad';
import { Tilretteleggingstype, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { Søkerrolle } from 'app/types/Søker';

const mockedSøknad: Søknad = {
    type: Søknadstype.SVANGERSKAPSPENGER,
    vedlegg: [],
    erEndringssøknad: false,
    barn: {
        erBarnetFødt: false,
        termindato: new Date('2019-09-01'),
    },
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
    tilrettelegging: [
        {
            type: Tilretteleggingstype.HEL,
            behovForTilretteleggingFom: new Date('2019-03-01'),
            tilrettelagtArbeidFom: new Date('2019-10-01'),
            vedlegg: [],
            arbeidsforhold: {
                type: Arbeidsforholdstype.VIRKSOMHET,
                id: '973135678',
            },
        },
    ],
    søker: {
        rolle: Søkerrolle.MOR,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        selvstendigNæringsdrivendeInformasjon: [],
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        andreInntekterSiste10Mnd: [],
    },
};

export default mockedSøknad;
