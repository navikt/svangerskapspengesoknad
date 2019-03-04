import React, { FunctionComponent } from 'react';
import Steg, { StegProps } from '../../components/steg/Steg';

const AndreSteg: FunctionComponent<StegProps> = (stegProps) => {
    return <Steg {...stegProps}>[Innholdet til det andre steget]</Steg>;
};

export default AndreSteg;
