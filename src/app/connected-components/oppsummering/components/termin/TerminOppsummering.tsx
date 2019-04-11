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
            <div className="point5remMargin">
                <FormattedMessage
                    id="oppsummering.termin.personalia.navn"
                    values={{
                        navn: `${fornavn} ${etternavn}`,
                    }}
                />
            </div>
            <div className="point5remMargin">
                <FormattedMessage
                    id="oppsummering.termin.personalia.fnr"
                    values={{
                        fnr: fnr,
                    }}
                />
            </div>
        </>
    );
};

export default TerminOppsummering;
