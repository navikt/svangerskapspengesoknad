import React, { FunctionComponent } from 'react';

interface Props {
    melding: string;
}

const Feil: FunctionComponent<Props> = ({ melding }) => {
    return <div>{melding}</div>;
};

export default Feil;
