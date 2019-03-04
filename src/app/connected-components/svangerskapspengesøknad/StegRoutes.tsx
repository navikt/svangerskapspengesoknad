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

interface Props {
    steg: StegID;
    history: History;
}

const StegRoutes: FunctionComponent<Props> = ({ steg, history }) => {
    const requestNavigateToNextStep = (id: StegID) => () => {
        history.push(søknadStegPath(id));
    };

    const getPropsForStep = (stegID: StegID) => {
        const [forrigeStegID, nesteStegID] = getAdjacentSteps(stegID);

        return {
            id: stegID,
            nesteStegID,
            forrigeStegID,
            renderNesteknapp: !!nesteStegID,
            renderSendeknapp: !nesteStegID,
            onRequestNavigateToNextStep: nesteStegID ? requestNavigateToNextStep(nesteStegID) : undefined,
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

const mapStateToProps = (state: State) => ({
    steg: state.common.steg,
});

export default connect(mapStateToProps)(StegRoutes);
