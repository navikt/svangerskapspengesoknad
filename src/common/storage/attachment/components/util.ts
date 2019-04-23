import { guid } from 'nav-frontend-js-utils';
import { Attachment, InnsendingsType } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { AnnenInntektType } from 'app/types/AnnenInntekt';

export const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    innsendingsType?: InnsendingsType
): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    type,
    skjemanummer,
    innsendingsType
});

export const isAttachmentWithError = ({ pending, uploaded, innsendingsType }: Attachment) => {
    if (innsendingsType === InnsendingsType.SEND_SENERE) {
        return false;
    }
    return pending === false && uploaded === false;
};

export const getSkjemanummerForAndreInntekter = (annenInntektType: AnnenInntektType): Skjemanummer => {
    switch (annenInntektType) {
        case AnnenInntektType.MILITÆRTJENESTE:
            return Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE;
        case AnnenInntektType.JOBB_I_UTLANDET:
            return Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG;
        default:
            return Skjemanummer.ANNET;
    }
};

export const isAttachmentForAnnenInntekt = (type: AttachmentType) => type === AttachmentType.ANNEN_INNTEKT;
