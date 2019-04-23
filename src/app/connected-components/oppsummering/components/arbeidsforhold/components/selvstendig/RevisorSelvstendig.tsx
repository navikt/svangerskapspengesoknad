import React, { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';
import { Element } from 'nav-frontend-typografi';
import { Næringsrelasjon } from 'app/types/SelvstendigNæringsdrivende';

import './revisorSelvstendig.less';
import { FormattedMessage } from 'react-intl';

const cls = BEMHelper('revisorSelvstendig');

interface Props {
    revisor: Næringsrelasjon;
}

const RevisorSelvstendig: FunctionComponent<Props> = ({ revisor }) => {
    return (
        <div className={cls.block}>
            <div>
                <Element>Revisor</Element>
            </div>
            <div className="margin-xs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.navn"
                    values={{ navn: revisor.navn }}
                />
            </div>
            <div className="margin-xs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.tlf"
                    values={{ telefon: revisor.telefonnummer }}
                />
            </div>
            <div className="margin-xs">
                {revisor.erNærVennEllerFamilie
                    ? 'Revisor er en nær venn eller familie'
                    : 'Revisor er ikke en nær venn eller familie'}
            </div>
        </div>
    );
};

export default RevisorSelvstendig;
