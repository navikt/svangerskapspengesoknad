import { Tilretteleggingstype, Arbeidsforholdstype } from './Tilrettelegging';

interface ArbeidsforholdFrilansDTO {
    type: Arbeidsforholdstype;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

interface ArbeidsforholdPrivatDTO {
    type: Arbeidsforholdstype;
    fnr: string;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

interface ArbeidsforholdVirksomhetDTO {
    type: Arbeidsforholdstype;
    orgnr: string;
}

type ArbeidsforholdDTO = ArbeidsforholdFrilansDTO | ArbeidsforholdPrivatDTO | ArbeidsforholdVirksomhetDTO;

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
