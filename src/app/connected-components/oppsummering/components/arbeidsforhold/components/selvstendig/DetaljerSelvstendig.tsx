import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { EtikettLiten, Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './detaljerSelvstendig.less';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { Næringstype } from 'app/types/SelvstendigNæringsdrivende';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntl } from 'react-intl';

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
            <EtikettLiten>Org.nr: {orgnr}</EtikettLiten>
            <Element>{navnPåNæringen.toUpperCase()}</Element>
            <div className="margin-xs">
                <em>{typer.map((type) => getMessage(intl, `næringstype.${type.toLocaleLowerCase()}`))}</em>
            </div>
            <div className="margin-xs">
                {moment(oppstartsdato).format('DD.MM.YYYY')} - {pågående ? 'Pågående' : tidsperiode.tom}
            </div>
        </div>
    );
};

export default injectIntl(DetaljerSelvstendig);
