import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentAction, { AttachmentActionTypes } from '../types/AttachmentAction';

export const getDefaultAttachmentState = (): AttachmentState => ({
    vedlegg: [],
});

export interface AttachmentState {
    vedlegg: Array<Attachment>;
}

const attachmentReducer = (state = getDefaultAttachmentState(), action: AttachmentAction): AttachmentState => {
    switch (action.type) {
        case AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST: {
            return {
                ...state,
                vedlegg: [
                    ...state.vedlegg,
                    {
                        ...action.payload.attachment,
                        pending: true,
                    },
                ],
            };
        }

        case AttachmentActionTypes.UPLOAD_ATTACHMENT_SUCCESS: {
            const { url, uuid, attachment } = action.payload;

            return {
                ...state,
                vedlegg: state.vedlegg.map((v) =>
                    v.id === attachment.id
                        ? {
                              ...action.payload.attachment,
                              url,
                              uuid,
                              pending: false,
                              uploaded: true,
                          }
                        : v
                ),
            };
        }

        case AttachmentActionTypes.UPLOAD_ATTACHMENT_FAILURE: {
            const { attachment, error } = action.payload;
            const vedlegg = state.vedlegg.map((v) =>
                v.id === attachment.id
                    ? {
                          ...attachment,
                          error: error ? error.message : '',
                      }
                    : v
            );

            return {
                ...state,
                vedlegg,
            };
        }

        case AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST: {
            const { attachment } = action.payload;

            const vedlegg = state.vedlegg.map((v) =>
                v.id === attachment.id
                    ? {
                          ...action.payload.attachment,
                          pending: true,
                      }
                    : v
            );

            return {
                ...state,
                vedlegg,
            };
        }

        case AttachmentActionTypes.DELETE_ATTACHMENT_SUCCESS: {
            const { attachment } = action.payload;
            const vedlegg = state.vedlegg.filter((v) => v.id !== attachment.id);

            return {
                ...state,
                vedlegg,
            };
        }

        case AttachmentActionTypes.DELETE_ATTACHMENT_FAILURE: {
            const { attachment, error } = action.payload;

            const vedlegg = state.vedlegg.map((v) =>
                v.id === attachment.id
                    ? {
                          ...attachment,
                          pending: false,
                          error: error ? error.message : '',
                      }
                    : v
            );

            return {
                ...state,
                vedlegg,
            };
        }
    }

    return state;
};

export default attachmentReducer;
