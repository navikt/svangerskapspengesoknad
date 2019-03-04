import React, { FunctionComponent } from 'react';
import Steg, { StegProps } from '../../components/steg/Steg';

const FørsteSteg: FunctionComponent<StegProps> = (stegProps) => {
    return <Steg {...stegProps}>[Innholdet til det første steget]</Steg>;
};

export default FørsteSteg;
