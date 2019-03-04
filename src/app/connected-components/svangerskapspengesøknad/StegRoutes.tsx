import React from 'react';
import { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { History } from 'history';

import { søknadStegPath, getAdjacentSteps } from 'app/utils/stegUtils';
import { State } from 'app/redux/store';
import AndreSteg from '../steg/AndreSteg';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import FørsteSteg from '../steg/FørsteSteg';
import Oppsummering from '../steg/Oppsummering';
import StegID from 'app/types/StegID';
import Action from 'app/redux/types/Action';
import { CommonActionTypes } from 'app/redux/types/CommonAction';

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
                    path={søknadStegPath(StegID.FØRSTE_STEG)}
                    key={StegID.FØRSTE_STEG}
                    component={() => <FørsteSteg {...getPropsForStep(StegID.FØRSTE_STEG)} />}
                />
                <Route
                    path={søknadStegPath(StegID.ANDRE_STEG)}
                    key={StegID.ANDRE_STEG}
                    component={() => <AndreSteg {...getPropsForStep(StegID.ANDRE_STEG)} />}
                />
                <Route
                    path={søknadStegPath(StegID.OPPSUMMERING)}
                    key={StegID.OPPSUMMERING}
                    component={() => <Oppsummering {...getPropsForStep(StegID.OPPSUMMERING)} />}
                />
                <Redirect to={søknadStegPath(StegID.FØRSTE_STEG)} />
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
