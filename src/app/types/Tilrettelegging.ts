export enum Tilretteleggingstype {
    'HEL_TILRETTELEGGING' = 'helTilrettelegging',
    'DELVIS_TILRETTELEGGING' = 'delvisTilrettelegging',
    'INGEN_TILRETTELEGGING' = 'ingenTilrettelegging',
}

interface Tilretteleggingsbase {
    behovForTilretteleggingFom: Date;
    arbeidsgiverId: string;
}

export interface HelTilrettelegging extends Tilretteleggingsbase {
    tilrettelagtArbeidFom: Date;
    stillingsprosent: number;
}

export interface DelvisTilrettelegging extends Tilretteleggingsbase {
    tilrettelagtArbeidFom: Date;
}

export interface IngenTilrettelegging extends Tilretteleggingsbase {
    slutteArbeidFom: Date;
}

type Tilrettelegging = HelTilrettelegging | DelvisTilrettelegging | IngenTilrettelegging;

export default Tilrettelegging;
