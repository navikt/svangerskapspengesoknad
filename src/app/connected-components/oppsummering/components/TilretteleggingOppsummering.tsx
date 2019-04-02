import React, { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';

import './tilretteleggingOppsummering.less';
import { EtikettLiten, Element } from 'nav-frontend-typografi';
import { UferdigTilrettelegging } from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getArbeidsforholdNavnFromId } from 'app/utils/arbeidsforholdUtils';

const cls = BEMHelper('tilretteleggingOppsummering');

interface Props {
    tilrettelegging: UferdigTilrettelegging[];
    arbeidsforhold: Arbeidsforhold[];
}

const TilretteleggingOppsummering: FunctionComponent<Props> = ({ tilrettelegging, arbeidsforhold }) => {
    return (
        <div className={cls.element('container')}>
            <EtikettLiten>
                {getArbeidsforholdNavnFromId(tilrettelegging[0].arbeidsforhold.id, arbeidsforhold)}
            </EtikettLiten>
            <Element>3. okt 2019 - 4. nov 2019</Element>
            <Element>5. nov 2019 - Fødselspermisjon</Element>
        </div>
    );
};

export default TilretteleggingOppsummering;
