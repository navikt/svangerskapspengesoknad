import { UferdigSøknad } from './types/Søknad';
import { Søkerrolle } from './types/Søker';
import { Arbeidsforholdstype } from './types/Tilrettelegging';

const mockSøknad: UferdigSøknad = {
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    barn: {
        termindato: new Date('2019-04-09T00:00:00.000Z'),
        erBarnetFødt: false,
    },
    tilrettelegging: [
        {
            id: '973135678',
            vedlegg: [],
            behovForTilretteleggingFom: new Date(),
            type: [],
            arbeidsforhold: {
                id: '973135678',
                type: Arbeidsforholdstype.VIRKSOMHET,
            },
        },
    ],
    søknadsgrunnlag: [
        {
            id: '973135678',
            type: Arbeidsforholdstype.VIRKSOMHET,
        },
    ],
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
    søker: {
        rolle: Søkerrolle.MOR,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        selvstendigNæringsdrivendeInformasjon: [],

        harHattAnnenInntektSiste10Mnd: false,
        andreInntekterSiste10Mnd: [],
    },
};
export default mockSøknad;
