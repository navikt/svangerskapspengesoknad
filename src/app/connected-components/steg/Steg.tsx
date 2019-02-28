import React, { FunctionComponent } from 'react';
import StegID from 'app/types/Steg';
import Søknad from 'app/types/Søknad';
import { Form } from 'formik';
import { Hovedknapp } from 'nav-frontend-knapper';
import { connect } from 'react-redux';
import Action from 'app/redux/types/Action';
import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { Link } from 'react-router-dom';
import { søknadStegPath } from '../svangerskapspengesøknad/StegRoutes';

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
        <Form>
            {forrigeStegID && <Link to={søknadStegPath(forrigeStegID)}>Tilbake</Link>}
            <h1>Søknad: {id}</h1>
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
