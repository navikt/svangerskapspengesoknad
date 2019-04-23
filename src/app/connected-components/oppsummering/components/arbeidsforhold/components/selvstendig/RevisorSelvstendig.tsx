import React, { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';
import { Element } from 'nav-frontend-typografi';
import { Næringsrelasjon } from 'app/types/SelvstendigNæringsdrivende';

import './revisorSelvstendig.less';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

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
            <Block margin="xxs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.navn"
                    values={{ navn: revisor.navn }}
                />
            </Block>
            <Block margin="xxs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.tlf"
                    values={{ telefon: revisor.telefonnummer }}
                />
            </Block>
            <Block margin="xxs">
                {revisor.erNærVennEllerFamilie ? (
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.vennEllerFamilie" />
                ) : (
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.revisor.ikkeVennEllerFamilie" />
                )}
            </Block>
        </div>
    );
};

export default RevisorSelvstendig;
