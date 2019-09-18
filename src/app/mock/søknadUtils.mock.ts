import { Arbeidsforholdstype, Tilretteleggingstype, UferdigTilrettelegging } from '../types/Tilrettelegging';
import { initialSøknad, UferdigSøknad } from '../types/Søknad';

const selvstendigTilrettelegging: UferdigTilrettelegging = {
    id: 'sdgf',
    vedlegg: ['V82187933376995392214929871235303834'],
    arbeidsforhold: {
        type: Arbeidsforholdstype.SELVSTENDIG
    },
    risikoFaktorer: 'Selvstendig er skummelt i seg selv',
    behovForTilretteleggingFom: new Date(),
    type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
    ingenTilrettelegging: [
        {
            slutteArbeidFom: new Date()
        }
    ],
    delvisTilrettelegging: [
        {
            stillingsprosent: 20,
            tilrettelagtArbeidFom: new Date()
        }
    ],
    helTilrettelegging: [
        {
            tilrettelagtArbeidFom: new Date()
        }
    ],
    tilretteleggingstiltak: 'sdfsdf'
};

const frilansTilrettelegging: UferdigTilrettelegging = {
    id: 'Frilans',
    vedlegg: ['V81190844807492761421951617787104538'],
    arbeidsforhold: {
        type: Arbeidsforholdstype.FRILANSER
    },
    risikoFaktorer: 'sdfsdf',
    behovForTilretteleggingFom: new Date(),
    type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
    ingenTilrettelegging: [
        {
            slutteArbeidFom: new Date()
        }
    ],
    delvisTilrettelegging: [
        {
            tilrettelagtArbeidFom: new Date(),
            stillingsprosent: 22
        }
    ],
    helTilrettelegging: [
        {
            tilrettelagtArbeidFom: new Date()
        }
    ],
    tilretteleggingstiltak: 'sdfsdf'
};

const virksomhetTilrettelegging: UferdigTilrettelegging = {
    id: '973861778',
    vedlegg: ['V62140708603673047171502120454045017516'],
    arbeidsforhold: {
        id: '973861778',
        type: Arbeidsforholdstype.VIRKSOMHET
    },
    behovForTilretteleggingFom: new Date(),
    type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
    ingenTilrettelegging: [
        {
            slutteArbeidFom: new Date()
        }
    ],
    delvisTilrettelegging: [
        {
            stillingsprosent: 22,
            tilrettelagtArbeidFom: new Date()
        }
    ],
    helTilrettelegging: [
        {
            tilrettelagtArbeidFom: new Date()
        }
    ]
};

const tilrettelegginger: UferdigTilrettelegging[] = [
    virksomhetTilrettelegging,
    selvstendigTilrettelegging,
    frilansTilrettelegging
];

const uferdigSøknad: UferdigSøknad = {
    ...initialSøknad,
    søknadsgrunnlag: [
        {
            id: '973861778',
            type: Arbeidsforholdstype.VIRKSOMHET
        },
        {
            id: 'Frilans',
            type: Arbeidsforholdstype.FRILANSER
        },
        {
            id: 'Selvstendig',
            type: Arbeidsforholdstype.SELVSTENDIG
        }
    ],
    tilrettelegging: tilrettelegginger
};

const SøknadUtilsMock = {
    tilrettelegginger,
    virksomhetTilrettelegging,
    frilansTilrettelegging,
    selvstendigTilrettelegging,
    uferdigSøknad
};

export default SøknadUtilsMock;
