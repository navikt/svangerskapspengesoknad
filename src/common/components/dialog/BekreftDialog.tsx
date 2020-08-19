import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import Knapperad from 'common/components/knapperad/Knapperad';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { useIntl } from 'react-intl';

import './bekreftDialog.less';

export interface Props extends ModalProps {
    tittel?: string;
    /** Kalles når bruker klikker bekreft-knapp  */
    onBekreft: () => void;
    /** Kalles når bruker klikker avbryt. Dersom denne ikke settes, brukes onRequestClose fra nav-frontend-modal */
    onAvbryt?: () => void;
    /** Label for bekreft-knapp. Default hentes fra intl: komponent.bekreftDialog.bekreftLabel */
    bekreftLabel?: string;
    /** Label for avbryt-knapp. Default hentes fra intl: komponent.bekreftDialog.avbrytLabel */
    avbrytLabel?: string;
    /** Maks bredde */
    størrelse?: undefined | '30';
}

const bem = BEMHelper('bekreftDialog');

const BekreftDialog: FunctionComponent<Props> = ({
    tittel,
    onAvbryt,
    onBekreft,
    avbrytLabel,
    bekreftLabel,
    children,
    størrelse,
    ...modalProps
}) => {
    const intl = useIntl();

    return (
        <Modal
            shouldCloseOnOverlayClick={false}
            {...modalProps}
            className={classnames(bem.block, størrelse ? bem.modifier(`size-${størrelse}`) : undefined)}
        >
            {modalProps.isOpen && (
                <>
                    {tittel && <Systemtittel className="blokk-s">{tittel}</Systemtittel>}
                    <div className="blokk-m">{children}</div>
                    <Knapperad>
                        <Hovedknapp onClick={() => onBekreft()} className="bekreftDialog__bekreftKnapp">
                            {bekreftLabel ||
                                intl.formatMessage({
                                    id: 'komponent.bekreftDialog.bekreftLabel',
                                })}
                        </Hovedknapp>
                        <Knapp
                            onClick={() => (onAvbryt ? onAvbryt() : modalProps.onRequestClose())}
                            className="bekreftDialog__avbrytKnapp"
                        >
                            {avbrytLabel ||
                                intl.formatMessage({
                                    id: 'komponent.bekreftDialog.avbrytLabel',
                                })}
                        </Knapp>
                    </Knapperad>
                </>
            )}
        </Modal>
    );
};

export default BekreftDialog;
