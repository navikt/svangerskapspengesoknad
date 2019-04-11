import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn, { UferdigBarn } from './Barn';
import Søker, { Søkerrolle } from './Søker';
import Tilrettelegging, { UferdigTilrettelegging, Arbeidsforholdstype, Tilretteleggingstype } from './Tilrettelegging';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { FormikErrors } from 'formik';
import { Næring, Næringstype } from './SelvstendigNæringsdrivende';
// import { Næringstype, Næring } from './SelvstendigNæringsdrivende';
// import mockSøknad from '../mockSoknad';

export enum Søknadstype {
    'SVANGERSKAPSPENGER' = 'svangerskapspenger',
}

interface Søknad {
    type: Søknadstype;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: Barn;
    vedlegg?: Attachment[];
    tilrettelegging: Tilrettelegging[];
    søker: Søker;
}

export interface UferdigSøknad {
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdPartial;
    barn: UferdigBarn;
    tilrettelegging: UferdigTilrettelegging[];
    søknadsgrunnlag: Søknadsgrunnlag[];
    søker: Partial<Søker>;
}

// export const initialSøknad: UferdigSøknad = {
//     harGodkjentVilkår: false,
//     harGodkjentOppsummering: false,
//     barn: {},
//     tilrettelegging: [],
//     søknadsgrunnlag: [],
//     informasjonOmUtenlandsopphold: {
//         jobbetINorgeSiste12Mnd: true,
//         iNorgePåHendelsestidspunktet: true,
//         tidligereOpphold: [],
//         senereOpphold: [],
//     },
//     søker: {
//         rolle: Søkerrolle.MOR,
//         selvstendigNæringsdrivendeInformasjon: [],
//         andreInntekterSiste10Mnd: [],
//     },
// };

const snPartial: Partial<Næring> = {
    næringstyper: [Næringstype.JORDBRUK],
    navnPåNæringen: 'Jordbruk As',
    registrertINorge: true,
    organisasjonsnummer: '999999999',
    tidsperiode: {
        fom: new Date('2019-01-01T00:00:00.000Z'),
    },
    næringsinntekt: 555566,
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
    oppstartsdato: '2018-09-01',
    harRegnskapsfører: false,
    harRevisor: false,
};

export const initialSøknad: UferdigSøknad = {
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    barn: {
        termindato: new Date('2019-04-30T00:00:00.000Z'),
        erBarnetFødt: false,
    },
    tilrettelegging: [
        {
            id: '973135678',
            vedlegg: [],
            arbeidsforhold: {
                id: '973135678',
                type: Arbeidsforholdstype.VIRKSOMHET,
            },
            behovForTilretteleggingFom: new Date('2019-04-01T00:00:00.000Z'),
            type: [Tilretteleggingstype.INGEN],
            ingenTilrettelegging: {
                slutteArbeidFom: new Date('2019-04-06T00:00:00.000Z'),
            },
        },
        {
            id: '974716860',
            vedlegg: [],
            arbeidsforhold: {
                id: '974716860',
                type: Arbeidsforholdstype.VIRKSOMHET,
            },
            behovForTilretteleggingFom: new Date('2019-04-01T00:00:00.000Z'),
            type: [Tilretteleggingstype.INGEN, Tilretteleggingstype.DELVIS, Tilretteleggingstype.HEL],
            helTilrettelegging: {
                tilrettelagtArbeidFom: new Date('2019-04-01T00:00:00.000Z'),
            },
            ingenTilrettelegging: {
                slutteArbeidFom: new Date('2019-04-08T00:00:00.000Z'),
            },
            delvisTilrettelegging: {
                tilrettelagtArbeidFom: new Date('2019-04-15T00:00:00.000Z'),
                stillingsprosent: 55,
            },
        },
        {
            id: 'Jordbruk As',
            vedlegg: [],
            arbeidsforhold: {
                type: Arbeidsforholdstype.SELVSTENDIG,
            },
            behovForTilretteleggingFom: new Date('2019-04-01T00:00:00.000Z'),
            type: [Tilretteleggingstype.HEL],
            helTilrettelegging: {
                tilrettelagtArbeidFom: new Date('2019-04-01T00:00:00.000Z'),
            },
        },
        {
            id: 'Frilans',
            vedlegg: [],
            arbeidsforhold: {
                type: Arbeidsforholdstype.FRILANSER,
            },
            behovForTilretteleggingFom: new Date('2019-04-01T00:00:00.000Z'),
            type: [Tilretteleggingstype.DELVIS],
            delvisTilrettelegging: {
                tilrettelagtArbeidFom: new Date('2019-04-01T00:00:00.000Z'),
                stillingsprosent: 50,
            },
        },
    ],
    søknadsgrunnlag: [
        {
            id: '973135678',
            type: Arbeidsforholdstype.VIRKSOMHET,
        },
        {
            id: '974716860',
            type: Arbeidsforholdstype.VIRKSOMHET,
        },
        {
            id: 'Jordbruk As',
            type: Arbeidsforholdstype.SELVSTENDIG,
        },
        {
            id: 'Frilans',
            type: Arbeidsforholdstype.FRILANSER,
        },
    ],
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        tidligereOpphold: [],
        senereOpphold: [],
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
    },
    søker: {
        rolle: Søkerrolle.MOR,
        selvstendigNæringsdrivendeInformasjon: [snPartial as Næring],
        andreInntekterSiste10Mnd: [],
        harJobbetSomFrilansSiste10Mnd: true,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true,
        harHattAnnenInntektSiste10Mnd: false,
        frilansInformasjon: {
            oppstart: new Date('2019-01-01T00:00:00.000Z'),
            jobberFremdelesSomFrilans: false,
            harJobbetForNærVennEllerFamilieSiste10Mnd: false,
            driverFosterhjem: false,
        },
    },
};

export interface Søknadsgrunnlag {
    id: string;
    type: Arbeidsforholdstype;
}

export type Søknadfeil = FormikErrors<UferdigSøknad>;

export default Søknad;
