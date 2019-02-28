import React, { FunctionComponent } from 'react';
import Steg, { StegProps } from './Steg';

const Oppsummering: FunctionComponent<StegProps> = (stegProps) => {
    return <Steg {...stegProps}>[Oppsummering]</Steg>;
};

export default Oppsummering;
