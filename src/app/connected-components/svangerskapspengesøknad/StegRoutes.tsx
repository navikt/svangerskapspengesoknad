import React from 'react';
import { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { History } from 'history';

import { CommonActionTypes } from 'app/redux/types/CommonAction';
import { søknadStegPath, getAdjacentSteps } from 'app/utils/stegUtils';
import Action from 'app/redux/types/Action';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Oppsummering from '../steg/Oppsummering';
import StegID from 'app/types/StegID';
import Termin from '../steg/Termin';
import Arbeidsforhold from '../steg/Arbeidsforhold';

interface Props {
    history: History;
    navigateToStep: (steg: StegID) => void;
}

const StegRoutes: FunctionComponent<Props> = ({ navigateToStep, history }) => {
    const onNavigateToStep = (id: StegID) => () => {
        navigateToStep(id);
        history.push(søknadStegPath(id));
    };

    const getPropsForStep = (stegID: StegID) => {
        const [forrigeStegID, nesteStegID] = getAdjacentSteps(stegID);

        return {
            id: stegID,
            renderNesteknapp: !!nesteStegID,
            renderSendeknapp: !nesteStegID,
            onRequestNavigateToNextStep: nesteStegID ? onNavigateToStep(nesteStegID) : undefined,
            onRequestNavigateToPreviousStep: forrigeStegID ? onNavigateToStep(forrigeStegID) : undefined,
            history,
        };
    };

    return (
        <Applikasjonsside visSpråkvelger={true} visTittel={true}>
            <Switch>
                <Route
                    path={søknadStegPath(StegID.TERMIN)}
                    key={StegID.TERMIN}
                    component={() => <Termin {...getPropsForStep(StegID.TERMIN)} />}
                />
                <Route
                    path={søknadStegPath(StegID.ARBEIDSFORHOLD)}
                    key={StegID.ARBEIDSFORHOLD}
                    component={() => <Arbeidsforhold {...getPropsForStep(StegID.ARBEIDSFORHOLD)} />}
                />
                <Route
                    path={søknadStegPath(StegID.OPPSUMMERING)}
                    key={StegID.OPPSUMMERING}
                    component={() => <Oppsummering {...getPropsForStep(StegID.OPPSUMMERING)} />}
                />
                <Redirect to={søknadStegPath(StegID.TERMIN)} />
            </Switch>
        </Applikasjonsside>
    );
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    navigateToStep: (steg: StegID) => dispatch({ type: CommonActionTypes.SET_STEG, payload: { steg } }),
});

export default connect(
    () => ({}),
    mapDispatchToProps
)(StegRoutes);
