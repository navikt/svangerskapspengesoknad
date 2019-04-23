import { Tilretteleggingstype, Arbeidsforholdstype } from './Tilrettelegging';

export interface ArbeidsforholdFrilansDTO {
    type: Arbeidsforholdstype.FRILANSER;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

export interface ArbeidsforholdSelvstendigDTO {
    type: Arbeidsforholdstype.SELVSTENDIG;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

export interface ArbeidsforholdAnnenInntektDTO {
    type: Arbeidsforholdstype.FRILANSER;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

export interface ArbeidsforholdVirksomhetDTO {
    type: Arbeidsforholdstype.VIRKSOMHET | Arbeidsforholdstype.PRIVAT;
    id: string;
}
export const isArbeidsforholdVirksomhetDTO = (
    arbeidsforhold: ArbeidsforholdDTO
): arbeidsforhold is ArbeidsforholdVirksomhetDTO => {
    return arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET;
};

export type ArbeidsforholdDTO = ArbeidsforholdFrilansDTO | ArbeidsforholdSelvstendigDTO | ArbeidsforholdVirksomhetDTO;

interface TilretteleggingDTOBase {
    type: Tilretteleggingstype;
    behovForTilretteleggingFom: Date;
    arbeidsforhold: ArbeidsforholdDTO;
    vedlegg: string[];
}

export interface HelTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.HEL;
    tilrettelagtArbeidFom: Date;
}
export interface DelvisTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.DELVIS;
    tilrettelagtArbeidFom: Date;
    stillingsprosent: number;
}

export interface IngenTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.INGEN;
    slutteArbeidFom: Date;
}

export type TilretteleggingDTO = HelTilretteleggingDTO | DelvisTilretteleggingDTO | IngenTilretteleggingDTO;
