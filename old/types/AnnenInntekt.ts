import { Attachment } from 'common/storage/attachment/types/Attachment';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';

export enum AnnenInntektType {
    'MILITÆRTJENESTE' = 'MILITÆR_ELLER_SIVILTJENESTE',
    'JOBB_I_UTLANDET' = 'JOBB_I_UTLANDET',
}

abstract class AnnenInntektBase {
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export class MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export class JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export type AnnenInntekt = MilitærtjenesteInntekt | JobbIUtlandetInntekt;

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    vedlegg: Attachment[];
}
