import React, { FunctionComponent } from 'react';
import { Næringsrelasjon } from 'app/types/SelvstendigNæringsdrivende';
import { Element } from 'nav-frontend-typografi';

import './regnskapsførerSelvstendig.less';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';

const cls = BEMHelper('regnskapsførerSelvstendig.less');

interface Props {
    regnskapsfører: Næringsrelasjon;
}

const RegnskapsførerSelvstendig: FunctionComponent<Props> = ({ regnskapsfører }) => {
    return (
        <div className={cls.block}>
            <div>
                <Element>
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører" />
                </Element>
            </div>
            <div className="margin-xs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører.navn"
                    values={{ navn: regnskapsfører.navn }}
                />
            </div>
            <div className="margin-xs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører.tlf"
                    values={{ navn: regnskapsfører.telefonnummer }}
                />
            </div>
            <div className="margin-xs">
                {regnskapsfører.erNærVennEllerFamilie
                    ? 'Revisor er en nær venn eller familie'
                    : 'Revisor er ikke en nær venn eller familie'}
            </div>
        </div>
    );
};

export default RegnskapsførerSelvstendig;
