import React, { FunctionComponent } from 'react';
import moment from 'moment';
import Block from 'common/components/block/Block';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import { EtikettLiten, Element } from 'nav-frontend-typografi';

interface Props {
    selvstendigInformasjon: Næring;
}

const InformasjonOmSelvstendig: FunctionComponent<Props> = ({ selvstendigInformasjon }) => {
    return (
        <Block margin="xxs">
            <div className="grayInfoBox">
                <EtikettLiten>Org.nr: {selvstendigInformasjon.organisasjonsnummer}</EtikettLiten>
                <Element>{selvstendigInformasjon.navnPåNæringen.toUpperCase()}</Element>
                {moment(selvstendigInformasjon.oppstartsdato).format('DD.MM.YYYY')}
            </div>
        </Block>
    );
};

export default InformasjonOmSelvstendig;
