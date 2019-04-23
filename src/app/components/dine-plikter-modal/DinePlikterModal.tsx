import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

type Props = DineRettigheterModalProps & InjectedIntlProps;
const DinePlikterModal = (props: Props) => {
    const { intl } = props;
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
            contentLabel={getMessage(intl, 'intro.dinePlikter.sectionheading')}>
            <article className="velkommenModalContent">
                <Systemtittel tag="h1" className="velkommenModalContent__header">
                    {getMessage(intl, 'intro.dinePlikter.sectionheading')}
                </Systemtittel>
                <ul>
                    <li>
                        <Normaltekst>{getMessage(intl, 'intro.dinePlikter.listeElement.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage
                                id="intro.dinePlikter.listeElement.2"
                                values={{
                                    link: (
                                        <Lenke href="https://nav.no/rettOgPlikt" target="_blank">
                                            <FormattedMessage id="intro.dinePlikter.listeElement.2.link" />
                                        </Lenke>
                                    )
                                }}
                            />
                        </Normaltekst>
                    </li>
                </ul>
            </article>
        </Modal>
    );
};

export default injectIntl(DinePlikterModal);
