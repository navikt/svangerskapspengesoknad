import React, { FunctionComponent } from 'react';
import { Person } from 'app/types/Søkerinfo';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { Sidetittel, EtikettLiten } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { dateToHours } from 'app/utils/formatDate';

import Lenke from 'nav-frontend-lenker';
import { openPdfPreview } from '../util/pdfUtils';

import './kvitteringHeader.less';

interface Props {
    søker: Person;
    mottattDato: string;
    pdf: string;
}

const cls = BEMHelper('kvitteringHeader');

const KvitteringHeader: FunctionComponent<Props> = ({ søker, pdf }) => {
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

            <Block visible={pdf !== undefined}>
                <Lenke
                    href={'#'}
                    onClick={(e) => {
                        e.preventDefault();
                        openPdfPreview(pdf);
                    }}
                >
                    <FormattedMessage id={'søknadSendt.pdf'} />
                </Lenke>
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
