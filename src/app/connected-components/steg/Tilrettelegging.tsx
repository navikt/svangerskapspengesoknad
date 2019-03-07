import React, { FunctionComponent } from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Steg, { StegProps } from 'app/components/steg/Steg';

type Props = StegProps & InjectedIntlProps;

const Tilrettelegging: FunctionComponent<Props> = ({ intl, ...stegProps }) => {
    return (
        <Steg {...stegProps}>
            <div>Steg her!</div>
        </Steg>
    );
};

export default injectIntl(Tilrettelegging);
