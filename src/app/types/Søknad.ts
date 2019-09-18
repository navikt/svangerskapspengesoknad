import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn, { UferdigBarn } from './Barn';
import Søker, { Søkerrolle } from './Søker';
import { UferdigTilrettelegging, Arbeidsforholdstype, Tilretteleggingstype } from './Tilrettelegging';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { FormikErrors } from 'formik';
import { TilretteleggingDTO } from './TilretteleggingDTO';

export enum Søknadstype {
    'SVANGERSKAPSPENGER' = 'svangerskapspenger'
}

interface SøknadDTO {
    type: Søknadstype;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: Barn;
    vedlegg?: Attachment[];
    tilrettelegging: TilretteleggingDTO[];
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

export const initialSøknad: UferdigSøknad = {
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    barn: {
        termindato: new Date('2019-09-30'),
        erBarnetFødt: false
    },
    tilrettelegging: [
        {
            id: '096429518-3033-5344-0878-86180859528444',
            vedlegg: [],
            arbeidsforhold: {
                id: '096429518-3033-5344-0878-86180859528444',
                type: Arbeidsforholdstype.VIRKSOMHET
            },
            ingenTilrettelegging: {
                slutteArbeidFom: [new Date('2019-09-01')]
            },
            delvisTilrettelegging: [
                {
                    stillingsprosent: 66,
                    tilrettelagtArbeidFom: new Date('2019-09-01')
                }
            ],
            helTilrettelegging: {
                tilrettelagtArbeidFom: [new Date('2019-09-01')]
            },
            behovForTilretteleggingFom: new Date('2019-09-01'),
            type: [Tilretteleggingstype.HEL, Tilretteleggingstype.DELVIS, Tilretteleggingstype.INGEN]
        }
    ],
    søknadsgrunnlag: [
        {
            id: '096429518-3033-5344-0878-86180859528444',
            type: Arbeidsforholdstype.VIRKSOMHET
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
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
    }
};

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
//         senereOpphold: []
//     },
//     søker: {
//         rolle: Søkerrolle.MOR,
//         selvstendigNæringsdrivendeInformasjon: [],
//         andreInntekterSiste10Mnd: []
//     }
// };

export interface Søknadsgrunnlag {
    id: string;
    type: Arbeidsforholdstype;
}

export type Søknadfeil = FormikErrors<UferdigSøknad>;

export default SøknadDTO;
