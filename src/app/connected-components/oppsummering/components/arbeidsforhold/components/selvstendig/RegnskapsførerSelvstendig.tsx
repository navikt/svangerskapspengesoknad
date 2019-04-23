import React, { FunctionComponent } from 'react';
import { Næringsrelasjon } from 'app/types/SelvstendigNæringsdrivende';
import { Element } from 'nav-frontend-typografi';

import './regnskapsførerSelvstendig.less';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

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
            <Block margin="xxs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører.navn"
                    values={{ navn: regnskapsfører.navn }}
                />
            </Block>
            <Block margin="xxs">
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører.tlf"
                    values={{ navn: regnskapsfører.telefonnummer }}
                />
            </Block>
            <Block margin="xxs">
                {regnskapsfører.erNærVennEllerFamilie ? (
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører.vennEllerFamilie" />
                ) : (
                    <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.regnskapsfører.vennEllerFamilie" />
                )}
            </Block>
        </div>
    );
};

export default RegnskapsførerSelvstendig;
