import Arbeidsforhold from './Arbeidsforhold';

export enum Tilretteleggingstype {
    'HEL_TILRETTELEGGING' = 'helTilrettelegging',
    'DELVIS_TILRETTELEGGING' = 'delvisTilrettelegging',
    'INGEN_TILRETTELEGGING' = 'ingenTilrettelegging',
}

interface Tilrettelegging {
    type: Tilretteleggingstype;
    behovForTilretteleggingFom: Date;
    tilrettelagtArbeidFom: Date;
    stillingsprosent?: number;
    arbeidsforhold: Arbeidsforhold;
}

export default Tilrettelegging;
