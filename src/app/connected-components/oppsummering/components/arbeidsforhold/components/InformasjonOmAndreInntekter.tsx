import React, { FunctionComponent } from 'react';
import moment from 'moment';
import Block from 'common/components/block/Block';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import { Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface Props {
    annenInntekt: AnnenInntekt;
}

const InformasjonOmAndreInntekter: FunctionComponent<Props> = ({ annenInntekt }) => {
    return (
        <Block margin="xxs">
            <div className="grayInfoBox">
                <div className="margin-xs">
                    <Element>{annenInntekt.type}</Element>
                </div>
                <div>
                    {moment(annenInntekt.tidsperiode.fom).format('DD.MM.YYYY')} -{' '}
                    {annenInntekt.pågående ? (
                        <FormattedMessage id="pågående" />
                    ) : (
                        moment(annenInntekt.tidsperiode.tom).format('DD.MM.YYYY')
                    )}
                </div>
            </div>
        </Block>
    );
};

export default InformasjonOmAndreInntekter;
