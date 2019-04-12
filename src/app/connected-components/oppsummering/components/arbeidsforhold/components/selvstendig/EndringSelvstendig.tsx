import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { EndringAvNæringsinntektInformasjon } from 'app/types/SelvstendigNæringsdrivende';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './endringSelvstendig.less';

interface Props {
    endringAvNæringsinntektInformasjon: EndringAvNæringsinntektInformasjon;
}

const cls = BEMHelper('endringSelvstendig');

const EndringSelvstendig: FunctionComponent<Props> = ({ endringAvNæringsinntektInformasjon }) => {
    return (
        <div className={cls.block}>
            <div>
                <Element>Endring</Element>
            </div>
            <div className="margin-xs">{moment(endringAvNæringsinntektInformasjon.dato).format('DD.MM.YYYY')}</div>
            <div className="margin-xs">
                Næringsinntekt etter endring: {endringAvNæringsinntektInformasjon.næringsinntektEtterEndring}
            </div>
            <div className="margin-xs">
                Beskrivelse av endring:
                <div className={cls.element('beskrivelseAvEndring')}>
                    <em>{endringAvNæringsinntektInformasjon.forklaring}</em>
                </div>
            </div>
        </div>
    );
};

export default EndringSelvstendig;
