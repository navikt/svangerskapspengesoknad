import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn from './Barn';
import Attachment from './Attachment';
import Søker from './Søker';
import Tilrettelegging, { UferdigTilrettelegging, Arbeidsforholdstype } from './Tilrettelegging';

export enum Søknadstype {
    'SVANGERSKAPSPENGER' = 'svangerskapspenger',
}

export enum Skjemanummer {
    ANNET = 'I000060',
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
    barn: Barn;
    vedlegg: Attachment[];
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
