import React, { FunctionComponent } from 'react';
import { Person } from 'app/types/Søkerinfo';
import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { Sidetittel, EtikettLiten } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { dateToHours } from 'app/utils/formatDate';

import './kvitteringHeader.less';

interface Props {
    søker: Person;
    mottattDato: string;
}

const cls = BEMHelper('kvitteringHeader');

const KvitteringHeader: FunctionComponent<Props> = ({ søker, mottattDato }) => {
    return (
        <div className={cls.block}>
            <Block margin="m">
                <SpotlightLetter className={cls.element('spotlightLetter')} />
            </Block>

            <Block margin="s">
                <Sidetittel tag="h4">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            name: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Sidetittel>
            </Block>
            <Block>
                <div className={cls.element('sendtInnTid')}>
                    <EtikettLiten>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                    </EtikettLiten>
                    <span style={{ width: '0.25rem' }} />
                    {moment().format('Do MMMM YYYY')}, kl. {dateToHours(moment().toDate())}
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
