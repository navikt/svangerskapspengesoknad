import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';

const cls = BEMHelper('oppsummering');

const Oppsummeringspunkt = ({ title, children }: { title: string; children?: React.ReactNode }) => (
    <section className={cls.element('punkt')}>
        <Block>
            <Undertittel tag="h2">{title}</Undertittel>
            {children}
        </Block>
    </section>
);

export default Oppsummeringspunkt;
