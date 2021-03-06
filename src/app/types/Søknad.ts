import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn, { UferdigBarn } from './Barn';
import Søker, { Søkerrolle } from './Søker';
import { UferdigTilrettelegging, Arbeidsforholdstype } from './Tilrettelegging';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { FormikErrors } from 'formik';
import { TilretteleggingDTO } from './TilretteleggingDTO';

export enum Søknadstype {
    'SVANGERSKAPSPENGER' = 'svangerskapspenger',
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
    harGodkjentVilkår: false,
    harGodkjentOppsummering: false,
    barn: {},
    tilrettelegging: [],
    søknadsgrunnlag: [],
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
    søker: {
        rolle: Søkerrolle.MOR,
        selvstendigNæringsdrivendeInformasjon: [],
        andreInntekterSiste10Mnd: [],
    },
};

export interface Søknadsgrunnlag {
    id: string;
    type: Arbeidsforholdstype;
}

export type Søknadfeil = FormikErrors<UferdigSøknad>;

export default SøknadDTO;
