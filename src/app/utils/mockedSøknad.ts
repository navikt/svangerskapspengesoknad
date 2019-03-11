import Søknad, { Søknadstype } from 'app/types/Søknad';
import { Tilretteleggingstype, Arbeidsforholdstype } from 'app/types/Tilrettelegging';

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
            arbeidsforhold: {
                type: Arbeidsforholdstype.VIRKSOMHET,
                id: '973135678',
            },
        },
    ],
};

export default mockedSøknad;
