import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import classnames from 'classnames';

import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import BEMHelper from 'common/util/bem';
import Knapperad from 'common/components/knapperad/Knapperad';

import './modalForm.less';

export interface ModalFormProps {
    isOpen: boolean;
    title: string;
    renderForm: () => React.ReactNode;
    renderFormButtons: boolean;
    dialogSize?: 'large' | 'medium' | 'small';
    submitLabel?: string;
    cancelLabel?: string;
    onRequestClose?: () => void;
    onSubmit: () => void;
}

const cls = BEMHelper('modalForm');

type Props = ModalFormProps & InjectedIntlProps;

class ModalForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleOnRequestClose = this.handleOnRequestClose.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnRequestClose() {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }
    handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSubmit();
    }
    render() {
        const {
            isOpen,
            title,
            cancelLabel,
            submitLabel,
            intl,
            renderForm,
            dialogSize = 'large',
            renderFormButtons
        } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <Modal
                isOpen={isOpen}
                contentLabel={title}
                onRequestClose={this.handleOnRequestClose}
                closeButton={true}
                shouldCloseOnOverlayClick={false}
                className={classnames(cls.block, cls.modifier(dialogSize))}>
                <div className={cls.element('content')}>
                    <Undertittel className={cls.element('title')}>{title}</Undertittel>
                    <div className="blokk-m">{renderForm()}</div>
                    {renderFormButtons && (
                        <div className={cls.element('buttonrow')}>
                            <Knapperad>
                                <Knapp
                                    type="standard"
                                    htmlType="button"
                                    className={cls.element('cancelButton')}
                                    onClick={this.handleOnRequestClose}>
                                    {cancelLabel ||
                                        intl.formatMessage({
                                            id: 'komponent.modalForm.cancelLabel'
                                        })}
                                </Knapp>
                                <Hovedknapp className={cls.element('submitButton')}>
                                    {submitLabel ||
                                        intl.formatMessage({
                                            id: 'komponent.modalForm.submitLabel'
                                        })}
                                </Hovedknapp>
                            </Knapperad>
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}
export default injectIntl(ModalForm);
