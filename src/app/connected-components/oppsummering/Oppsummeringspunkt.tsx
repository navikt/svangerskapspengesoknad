import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import OppsummeringIkon from './OppsummeringIkon';
import { OppsummeringIkonType } from 'app/types/OppsummeringIkonType';

const cls = BEMHelper('oppsummering');

interface Props {
    title: string;
    type: OppsummeringIkonType;
    children?: React.ReactNode;
}

const Oppsummeringspunkt: FunctionComponent<Props> = ({ title, type, children }) => (
    <section>
        <Block>
            <div className={cls.element('punkt')}>
                <div className={cls.element('ikon')}>
                    <OppsummeringIkon type={type} />
                </div>
                <Undertittel className={cls.element('tittel')} tag="h2">
                    {title}
                </Undertittel>
            </div>
            {children}
        </Block>
    </section>
);

export default Oppsummeringspunkt;
