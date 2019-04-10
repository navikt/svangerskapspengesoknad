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

export interface Tilrettelegging {
    id: string;
    arbeidsforhold: {
        id?: string;
        type: Arbeidsforholdstype;
    };
    vedlegg: string[];
    helTilrettelegging?: {
        tilrettelagtArbeidFom: Date;
    };
    delvisTilrettelegging?: {
        tilrettelagtArbeidFom: Date;
        stillingsprosent: number;
    };
    IngenTilrettelegging?: {
        slutteArbeidFom: Date;
    };
}

export type UferdigTilrettelegging = Tilrettelegging & {
    helTilrettelegging?: {
        tilrettelagtArbeidFom?: Date;
    };
    delvisTilrettelegging?: {
        tilrettelagtArbeidFom?: Date;
        stillingsprosent?: number;
    };
    IngenTilrettelegging?: {
        slutteArbeidFom?: Date;
    };
};

export default Tilrettelegging;
