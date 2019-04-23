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
                <Element>
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.revisor" />
                </Element>
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
                {revisor.erNærVennEllerFamilie ? (
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.vennEllerFamilie" />
                ) : (
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.ikkeVennEllerFamilie" />
                )}
            </div>
        </div>
    );
};

export default RevisorSelvstendig;
