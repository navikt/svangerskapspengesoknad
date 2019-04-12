export enum Tilretteleggingstype {
    'HEL' = 'hel',
    'DELVIS' = 'delvis',
    'INGEN' = 'ingen',
    'NOE' = 'noe'
}

export enum Arbeidsforholdstype {
    'VIRKSOMHET' = 'virksomhet',
    'SELVSTENDIG' = 'selvstendig',
    'FRILANSER' = 'frilanser',
    'ANDRE_INNTEKTER' = 'privat'
}

export interface TilretteleggingArbeidsforhold {
    id?: string;
    type: Arbeidsforholdstype;
}
export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom: Date;
    arbeidsforhold: TilretteleggingArbeidsforhold;
    vedlegg: string[];
    helTilrettelegging?: {
        tilrettelagtArbeidFom: Date;
    };
    delvisTilrettelegging?: {
        tilrettelagtArbeidFom: Date;
        stillingsprosent: number;
    };
    ingenTilrettelegging?: {
        slutteArbeidFom: Date;
    };
}

export type UferdigTilrettelegging = Tilrettelegging & {
    behovForTilretteleggingFom?: Date;
    type: Tilretteleggingstype[];
    helTilrettelegging?: {
        tilrettelagtArbeidFom?: Date;
    };
    delvisTilrettelegging?: {
        tilrettelagtArbeidFom?: Date;
        stillingsprosent?: number;
    };
    ingenTilrettelegging?: {
        slutteArbeidFom?: Date;
    };
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
};

export default Tilrettelegging;
