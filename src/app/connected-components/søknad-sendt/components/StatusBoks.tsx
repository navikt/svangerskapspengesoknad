import React, { FunctionComponent } from 'react';

import './statusBoks.less';
import BEMHelper from 'common/util/bem';
import Lenkepanelbase from 'nav-frontend-lenkepanel';
import { Undertittel, EtikettLiten, Ingress, Systemtittel } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

const cls = BEMHelper('statusBoks');

interface Props {
    saksNr: string;
}

const StatusBoks: FunctionComponent<Props> = ({ saksNr }) => {
    return (
        <Block>
            <div className="oneremMargin">
                <Systemtittel>
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Systemtittel>
            </div>
            <Lenkepanelbase href="#" border={true} className="statusBoks__lenkepanel" tittelProps="ingress">
                <div className={cls.block}>
                    <div className={cls.element('left')}>
                        <div className="oneremMargin">
                            <Undertittel>
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Undertittel>
                        </div>
                        <EtikettBase type="fokus">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </EtikettBase>
                    </div>
                    <div className={cls.element('right')}>
                        <EtikettLiten>
                            <FormattedMessage id="søknadSendt.status.saksnummer" />
                        </EtikettLiten>
                        <Ingress>{saksNr}</Ingress>
                    </div>
                </div>
            </Lenkepanelbase>
        </Block>
    );
};

export default StatusBoks;
