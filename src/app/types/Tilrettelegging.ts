export enum Tilretteleggingstype {
    'HEL' = 'hel',
    'DELVIS' = 'delvis',
    'INGEN' = 'ingen',
}

interface Tilretteleggingsbase {
    behovForTilretteleggingFom: Date;
    arbeidsgiverId: string;
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

type Tilrettelegging = HelTilrettelegging | DelvisTilrettelegging | IngenTilrettelegging;

export default Tilrettelegging;
