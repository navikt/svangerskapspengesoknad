import React from 'react';
import { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { State } from 'app/redux/store';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import { History } from 'history';
import StegID from 'app/types/Steg';
import FørsteSteg from '../steg/FørsteSteg';
import AndreSteg from '../steg/AndreSteg';
import Oppsummering from '../steg/Oppsummering';

interface Props {
    steg: StegID;
    history: History;
}

export const søknadStegPath = (steg: StegID) => `/soknad/${steg}`;

const StegRoutes: FunctionComponent<Props> = ({ steg, history }) => {
    const requestNavigateToNextStep = (id: StegID) => () => {
        history.push(søknadStegPath(id));
    };

    return (
        <Applikasjonsside visSpråkvelger={true}>
            <Switch>
                <Route
                    path={søknadStegPath(StegID.FØRSTE_STEG)}
                    key={StegID.FØRSTE_STEG}
                    component={() => (
                        <FørsteSteg
                            id={StegID.FØRSTE_STEG}
                            nesteStegID={StegID.ANDRE_STEG}
                            renderNesteknapp={true}
                            onRequestNavigateToNextStep={requestNavigateToNextStep(StegID.ANDRE_STEG)}
                        />
                    )}
                />
                <Route
                    path={søknadStegPath(StegID.ANDRE_STEG)}
                    key={StegID.ANDRE_STEG}
                    component={() => (
                        <AndreSteg
                            id={StegID.ANDRE_STEG}
                            forrigeStegID={StegID.FØRSTE_STEG}
                            nesteStegID={StegID.OPPSUMMERING}
                            renderNesteknapp={true}
                            onRequestNavigateToNextStep={requestNavigateToNextStep(StegID.OPPSUMMERING)}
                        />
                    )}
                />
                <Route
                    path={søknadStegPath(StegID.OPPSUMMERING)}
                    key={StegID.OPPSUMMERING}
                    component={() => (
                        <Oppsummering
                            id={StegID.OPPSUMMERING}
                            forrigeStegID={StegID.ANDRE_STEG}
                            nesteStegID={StegID.OPPSUMMERING}
                            renderSendeknapp={true}
                        />
                    )}
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
