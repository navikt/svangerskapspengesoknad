import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn, { UferdigBarn } from './Barn';
import Søker, { Søkerrolle } from './Søker';
import Tilrettelegging, { UferdigTilrettelegging, Arbeidsforholdstype, Tilretteleggingstype } from './Tilrettelegging';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { FormikErrors } from 'formik';

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
    søker: Søker;
}

export const initialSøknad: UferdigSøknad = {
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    barn: {
        termindato: new Date('2019-04-27T00:00:00.000Z'),
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
            behovForTilretteleggingFom: new Date('2019-03-01T00:00:00.000Z'),
            type: Tilretteleggingstype.HEL,
            tilrettelagtArbeidFom: new Date('2019-03-14T00:00:00.000Z'),
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
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
    },
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

export interface Søknadsgrunnlag {
    id: string;
    type: Arbeidsforholdstype;
}

export type Søknadfeil = FormikErrors<UferdigSøknad>;

export default Søknad;
