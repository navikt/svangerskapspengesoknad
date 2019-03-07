import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import Barn from './Barn';
import Attachment from './Attachment';
import Tilrettelegging from './Tilrettelegging';

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

    // selvstendigNæringsdrivendeInformasjon?: Næring[];
    // frilansInformasjon?: FrilansInformasjon;
}

export interface UferdigSøknad {
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdPartial;
    barn: Barn;
    vedlegg: Attachment[];
    tilrettelegging: Tilrettelegging[];
    søknadsgrunnlag: string[];
}

export interface Søknadfeil {
    [s: string]: string | Søknadfeil | undefined;
}

export default Søknad;
