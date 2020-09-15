import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';
import { generateLink } from '../componentsUtils/componentsUtils';

const bem = BEMHelper('dinePersonOpplysningerModal');

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
            <Normaltekst className={bem.element('html')}>
                <FormattedMessage id={`intro.dinePersonopplysninger.avsnitt.${id}.html`} />
            </Normaltekst>
            <ul>
                <FormattedMessage tagName="li" id="intro.dinePersonopplysninger.avsnitt.html.punkt1" />
                <FormattedMessage tagName="li" id="intro.dinePersonopplysninger.avsnitt.html.punkt2" />
                <FormattedMessage tagName="li" id="intro.dinePersonopplysninger.avsnitt.html.punkt3" />
            </ul>
        </Block>
    );
};

type Props = DineRettigheterModalProps;
const DinePersonopplysningerModal = (props: Props) => {
    const intl = useIntl();
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
                        <FormattedMessage
                            id="intro.dinePersonopplysninger.behandling.html"
                            values={{
                                p: (msg: any) => <p>{msg}</p>,
                                a: (msg: any) => generateLink(msg, 'https://www.nav.no/foreldrepenger'),
                            }}
                        />
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

export default DinePersonopplysningerModal;
