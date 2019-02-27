import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
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
    tilrettelegging: Tilrettelegging;

    // arbeidsforhold?: Partial<Arbeidsforhold>;
    // selvstendigNæringsdrivendeInformasjon?: Næring[];
    // frilansInformasjon?: FrilansInformasjon;
}

export interface UferdigSøknad {
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>;
    barn: Partial<Barn>;
    vedlegg: Attachment[];
    tilrettelegging?: Partial<Tilrettelegging>;

    // tilrettelegging?: Partial<Tilrettelegging>;
    // arbeidsforhold?: Partial<Arbeidsforhold>;
}

export interface Søknadfeil {
    [s: string]: string | Søknadfeil;
}

export default Søknad;
