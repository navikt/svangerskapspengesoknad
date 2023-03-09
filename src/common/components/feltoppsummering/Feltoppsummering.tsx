import React from 'react';
import { Element } from 'nav-frontend-typografi';

import './feltoppsummering.less';
import InnholdMedLedetekst from 'common/components/innhold-med-ledetekst/InnholdMedLedetekst';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

const Feltoppsummering: React.FunctionComponent<Props> = ({ feltnavn, verdi }) => (
    <InnholdMedLedetekst
        className="feltoppsummering"
        ledetekst={feltnavn}
    >
        <Element className="feltoppsummering__verdi">{verdi}</Element>
    </InnholdMedLedetekst>
);

export default Feltoppsummering;
