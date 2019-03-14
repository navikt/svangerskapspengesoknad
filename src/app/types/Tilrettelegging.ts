export enum Tilretteleggingstype {
    'HEL' = 'hel',
    'DELVIS' = 'delvis',
    'INGEN' = 'ingen',
    'NOE' = 'noe',
}

export enum Arbeidsforholdstype {
    'VIRKSOMHET' = 'virksomhet',
    'SELVSTENDIG' = 'selvstendig',
    'FRILANSER' = 'frilanser',
    'PRIVAT' = 'privat',
}

interface Tilretteleggingsbase {
    type: Tilretteleggingstype;
    vedlegg: string[];
    behovForTilretteleggingFom: Date;
    arbeidsforhold: {
        id?: string;
        type: Arbeidsforholdstype;
    };
}

export interface HelTilrettelegging extends Tilretteleggingsbase {
    type: Tilretteleggingstype.HEL;
    tilrettelagtArbeidFom: Date;
}

export interface DelvisTilrettelegging extends Tilretteleggingsbase {
    type: Tilretteleggingstype.DELVIS;
    tilrettelagtArbeidFom: Date;
    stillingsprosent: number;
}

export interface IngenTilrettelegging extends Tilretteleggingsbase {
    type: Tilretteleggingstype.INGEN;
    slutteArbeidFom: Date;
}

export interface NoeTilrettelegging extends Tilretteleggingsbase {
    type: Tilretteleggingstype.NOE;
}

type Tilrettelegging = HelTilrettelegging | DelvisTilrettelegging | IngenTilrettelegging;

export type UferdigTilrettelegging = Tilrettelegging & {
    id: string;
    type?: Tilretteleggingstype;
    behovForTilretteleggingFom?: Date;
};

export default Tilrettelegging;
