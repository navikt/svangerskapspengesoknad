import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { EtikettLiten, Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './detaljerSelvstendig.less';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { Næringstype } from 'app/types/SelvstendigNæringsdrivende';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

interface Props {
    orgnr: string;
    navnPåNæringen: string;
    oppstartsdato: string;
    pågående: boolean;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    typer: Næringstype[];
    intl: InjectedIntl;
}

const cls = BEMHelper('detaljerSelvstendig');

const DetaljerSelvstendig: FunctionComponent<Props> = ({
    orgnr,
    navnPåNæringen,
    oppstartsdato,
    pågående,
    tidsperiode,
    typer,
    intl
}) => {
    return (
        <div className={cls.block}>
            <EtikettLiten>
                <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.orgnr" /> {orgnr}
            </EtikettLiten>
            <Element>{navnPåNæringen.toUpperCase()}</Element>
            <Block margin="xxs">
                <em>{typer.map((type) => getMessage(intl, `næringstype.${type.toLocaleLowerCase()}`))}</em>
            </Block>
            <Block margin="xxs">
                {moment(oppstartsdato).format('DD.MM.YYYY')} -{' '}
                {pågående ? <FormattedMessage id="pågående" /> : tidsperiode.tom}
            </Block>
        </div>
    );
};

export default injectIntl(DetaljerSelvstendig);
