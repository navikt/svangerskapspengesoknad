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

export interface TilretteleggingArbeidsforhold {
    id?: string;
    type: Arbeidsforholdstype;
}

export interface DelvisTilrettelegging {
    tilrettelagtArbeidFom: Date;
    stillingsprosent: number;
}

export interface HelTilrettelegging {
    tilrettelagtArbeidFom: Date;
}

export interface IngenTilrettelegging {
    slutteArbeidFom: Date;
}

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom: Date;
    arbeidsforhold: TilretteleggingArbeidsforhold;
    vedlegg: string[];
    helTilrettelegging?: HelTilrettelegging[];
    delvisTilrettelegging?: DelvisTilrettelegging[];
    ingenTilrettelegging?: IngenTilrettelegging[];
}

export type UferdigTilrettelegging = Tilrettelegging & {
    behovForTilretteleggingFom?: Date;
    type: Tilretteleggingstype[];
    helTilrettelegging?: [
        {
            tilrettelagtArbeidFom?: Date;
        }
    ];
    delvisTilrettelegging?: DelvisTilrettelegging[];
    ingenTilrettelegging?: [
        {
            slutteArbeidFom?: Date;
        }
    ];
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
};

export default Tilrettelegging;
