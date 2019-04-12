import React, { FunctionComponent } from 'react';
import { Næringsrelasjon } from 'app/types/SelvstendigNæringsdrivende';
import { Element } from 'nav-frontend-typografi';

import './regnskapsførerSelvstendig.less';
import BEMHelper from 'common/util/bem';

const cls = BEMHelper('regnskapsførerSelvstendig.less');

interface Props {
    regnskapsfører: Næringsrelasjon;
}

const RegnskapsførerSelvstendig: FunctionComponent<Props> = ({ regnskapsfører }) => {
    return (
        <div className={cls.block}>
            <div>
                <Element>Revisor</Element>
            </div>
            <div className="margin-xs">Navn: {regnskapsfører.navn}</div>
            <div className="margin-xs">Telefon: {regnskapsfører.telefonnummer}</div>
            <div className="margin-xs">
                {regnskapsfører.erNærVennEllerFamilie
                    ? 'Revisor er en nær venn eller familie'
                    : 'Revisor er ikke en nær venn eller familie'}
            </div>
        </div>
    );
};

export default RegnskapsførerSelvstendig;
