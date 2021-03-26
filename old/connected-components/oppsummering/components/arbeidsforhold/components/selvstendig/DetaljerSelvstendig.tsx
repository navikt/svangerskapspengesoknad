import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { Næringstype } from 'app/types/SelvstendigNæringsdrivende';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from 'common/components/block/Block';

import './detaljerSelvstendig.less';

interface Props {
    orgnr: string;
    navnPåNæringen: string;
    oppstartsdato: string;
    pågående: boolean;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    typer: Næringstype[];
}

const cls = BEMHelper('detaljerSelvstendig');

const DetaljerSelvstendig: FunctionComponent<Props> = ({
    orgnr,
    navnPåNæringen,
    oppstartsdato,
    pågående,
    tidsperiode,
    typer,
}) => {
    const intl = useIntl();

    return (
        <div className={cls.block}>
            <Normaltekst>
                <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.orgnr" /> {orgnr}
            </Normaltekst>
            <Element>{navnPåNæringen.toUpperCase()}</Element>
            <Block margin="xxs">
                <em>{typer.map((type) => getMessage(intl, `næringstype.${type.toLocaleLowerCase()}`))}</em>
            </Block>
            <Block margin="xxs">
                {moment(oppstartsdato).format('DD.MM.YYYY')} -{' '}
                {pågående ? <FormattedMessage id="pågående" /> : moment(tidsperiode.tom).format('DD.MM.YYYY')}
            </Block>
        </div>
    );
};

export default DetaljerSelvstendig;
