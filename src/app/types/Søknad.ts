import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn, { UferdigBarn } from './Barn';
import Søker from './Søker';
import Tilrettelegging, { UferdigTilrettelegging, Arbeidsforholdstype } from './Tilrettelegging';
import { Attachment } from 'common/storage/attachment/types/Attachment';

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

export interface Søknadsgrunnlag {
    id: string;
    type: Arbeidsforholdstype;
}

export interface Søknadfeil {
    [s: string]: string | Søknadfeil | undefined;
}

export default Søknad;
