import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    etternavn: string;
    fornavn: string;
    fnr: string;
}

const TerminOppsummering: FunctionComponent<Props> = ({ fornavn, etternavn, fnr }) => {
    return (
        <>
            <div className="margin-xs">
                <FormattedMessage
                    id="oppsummering.termin.personalia.navn"
                    values={{
                        navn: `${fornavn} ${etternavn}`
                    }}
                />
            </div>
            <div className="margin-xs">
                <FormattedMessage
                    id="oppsummering.termin.personalia.fnr"
                    values={{
                        fnr
                    }}
                />
            </div>
        </>
    );
};

export default TerminOppsummering;
