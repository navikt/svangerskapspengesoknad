import React from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';
import { useIntl } from 'react-intl';
import { ValidatorFailTextIntl } from 'common/lib/validation/types';

export interface Props {
    feil?: SkjemaelementFeil;
}

const renderFeil = (feil: SkjemaelementFeil): JSX.Element => {
    let msg;
    const intl = useIntl();
    if (typeof feil.feilmelding === 'string') {
        msg = feil.feilmelding;
    } else {
        const failTextIntl = feil.feilmelding as ValidatorFailTextIntl;
        msg = intl.formatMessage({ id: failTextIntl.intlKey }, failTextIntl.values);
    }
    return <div className="skjemaelement__feilmelding">{msg}</div>;
};

const SkjemaelementFeilmelding: React.FunctionComponent<Props> = ({ feil }) => {
    return (
        <div role="alert" aria-live="assertive">
            {feil && renderFeil(feil)}
        </div>
    );
};
export default SkjemaelementFeilmelding;
