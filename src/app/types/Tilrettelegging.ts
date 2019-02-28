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
