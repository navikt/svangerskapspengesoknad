import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { EndringAvNæringsinntektInformasjon } from 'app/types/SelvstendigNæringsdrivende';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './endringSelvstendig.less';
import OppsummeringBeskrivelse from '../../../OppsummeringBeskrivelse';
import { FormattedMessage } from 'react-intl';

interface Props {
    endringAvNæringsinntektInformasjon: EndringAvNæringsinntektInformasjon;
}

const cls = BEMHelper('endringSelvstendig');

const EndringSelvstendig: FunctionComponent<Props> = ({ endringAvNæringsinntektInformasjon }) => {
    return (
        <div className={cls.block}>
            <div>
                <Element>
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.endring" />
                </Element>
            </div>
            <div className="margin-xs">{moment(endringAvNæringsinntektInformasjon.dato).format('DD.MM.YYYY')}</div>
            <div className="margin-xs">
                <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.etterEndring" />{' '}
                {endringAvNæringsinntektInformasjon.næringsinntektEtterEndring}
            </div>
            <div className="margin-xs">
                <OppsummeringBeskrivelse
                    label="Beskrivelse av endring:"
                    innhold={endringAvNæringsinntektInformasjon.forklaring}
                />
            </div>
        </div>
    );
};

export default EndringSelvstendig;
