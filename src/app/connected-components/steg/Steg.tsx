import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formik';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Link } from 'react-router-dom';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { søknadStegPath } from 'app/utils/steg';
import Action from 'app/redux/types/Action';
import Søknad from 'app/types/Søknad';
import StegID from 'app/types/Steg';

export interface StegProps {
    id: StegID;
    nesteStegID?: StegID;
    forrigeStegID?: StegID;
    renderNesteknapp?: boolean;
    renderSendeknapp?: boolean;
    onRequestNavigateToNextStep?: () => void;
}

const Steg: FunctionComponent<StegProps> = (props) => {
    const {
        id,
        nesteStegID,
        forrigeStegID,
        renderNesteknapp,
        renderSendeknapp,
        onRequestNavigateToNextStep,
        children,
    } = props;

    return (
        <Form className="steg">
            {forrigeStegID && <Link to={søknadStegPath(forrigeStegID)}>Tilbake</Link>}
            <h1>{id}</h1>
            {children}
            {nesteStegID && renderNesteknapp && (
                <Hovedknapp htmlType="button" onClick={onRequestNavigateToNextStep}>
                    Neste
                </Hovedknapp>
            )}
            {renderSendeknapp && <Hovedknapp htmlType="submit">Send søknad</Hovedknapp>}
        </Form>
    );
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: (søknad: Søknad) => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad } });
    },
});

export default connect(
    () => ({}),
    mapDispatchToProps
)(Steg);
