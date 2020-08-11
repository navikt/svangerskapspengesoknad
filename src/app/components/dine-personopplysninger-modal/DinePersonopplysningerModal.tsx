import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const Avsnitt: React.FunctionComponent<{ id: string }> = ({ id }) => {
    return (
        <Block margin="s">
            <Ingress tag="h2">
                <FormattedMessage id={`intro.dinePersonopplysninger.avsnitt.${id}.tittel`} />
            </Ingress>
            <Normaltekst>
                <FormattedHTMLMessage id={`intro.dinePersonopplysninger.avsnitt.${id}.html`} />
            </Normaltekst>
        </Block>
    );
};

type Props = DineRettigheterModalProps & InjectedIntlProps;
const DinePersonopplysningerModal = (props: Props) => {
    const { intl } = props;
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            shouldCloseOnOverlayClick={false}
            closeButton={true}
            contentLabel={getMessage(intl, 'intro.dinePersonopplysninger.sectionheading')}
        >
            <article className="velkommenModalContent velkommenModalContent--50">
                <Block margin="s">
                    <Systemtittel tag="h1" className="velkommenModalContent__header">
                        {getMessage(intl, 'intro.dinePersonopplysninger.sectionheading')}
                    </Systemtittel>
                </Block>
                <Block margin="s">
                    <Normaltekst>
                        <FormattedHTMLMessage id="intro.dinePersonopplysninger.behandling.html" />
                    </Normaltekst>
                </Block>

                <Avsnitt id="innhenting" />
                <Avsnitt id="automatiskBehandling" />
                <Avsnitt id="svarPaSoknaden" />
                <Avsnitt id="personvernerklaringen" />
            </article>
        </Modal>
    );
};

export default injectIntl(DinePersonopplysningerModal);
