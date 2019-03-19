import React, { FunctionComponent } from 'react';
import { Tidsperiode } from 'common/types';

interface Props {
    tidsperiode: Partial<Tidsperiode>;
    onChange: (tidsperiode: Tidsperiode) => void;
}

const VelgTidsperiode: FunctionComponent<Props> = (props) => {
    // const { tidsperiode, onChange } = props;
    return <div>Dato</div>;
};

export default VelgTidsperiode;
