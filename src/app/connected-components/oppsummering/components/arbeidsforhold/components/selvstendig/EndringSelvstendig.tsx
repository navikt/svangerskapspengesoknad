import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { EndringAvNæringsinntektInformasjon } from 'app/types/SelvstendigNæringsdrivende';
import { Element } from 'nav-frontend-typografi';

interface Props {
    endringAvNæringsinntektInformasjon: EndringAvNæringsinntektInformasjon;
}

const EndringSelvstendig: FunctionComponent<Props> = ({ endringAvNæringsinntektInformasjon }) => {
    return (
        <>
            <Element>Endring</Element>
            {moment(endringAvNæringsinntektInformasjon.dato).format('DD.MM.YYYY')}
            {endringAvNæringsinntektInformasjon.næringsinntektEtterEndring}
            Beskrivelse av endring: {endringAvNæringsinntektInformasjon.forklaring}
        </>
    );
};

export default EndringSelvstendig;
