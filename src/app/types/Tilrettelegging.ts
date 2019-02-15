import Attachment from './Attachment';

export enum Tilretteleggingstype {
    'INGEN_TILRETTELEGGING' = 'ingenTilrettelegging',
    'REDUSERT_STILLINGSPROSENT' = 'redusertStillingsprosent',
    'SAMME_STILLINGSPROSENT' = 'sammeStillingsprosent',
}

interface Tilrettelegging {
    type: Tilretteleggingstype;
    fraDato: Date;
    stillingsprosent?: number;
    vedlegg?: Attachment[];
}

export default Tilrettelegging;
