import { Omit } from 'lodash';

export enum Tilretteleggingstype {
    'HEL' = 'hel',
    'DELVIS' = 'delvis',
    'INGEN' = 'ingen',
}

export enum Arbeidsforholdstype {
    'VIRKSOMHET' = 'virksomhet',
    'SELVSTENDIG' = 'selvstendig',
    'FRILANSER' = 'frilanser',
    'PRIVAT' = 'privat',
}

interface Tilretteleggingsbase {
    type: Tilretteleggingstype;
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

type Tilrettelegging = HelTilrettelegging | DelvisTilrettelegging | IngenTilrettelegging;

export type UferdigTilrettelegging = Tilrettelegging & {
    id: string;
    type?: Tilretteleggingstype;
    behovForTilretteleggingFom?: Date;
};

export type UbestemtTilrettelegging = Omit<Tilretteleggingsbase, 'type' | 'behovForTilretteleggingFom'>;

export default Tilrettelegging;
