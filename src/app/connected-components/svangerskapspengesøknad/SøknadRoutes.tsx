import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Intro from '../intro/Intro';
import { BrowserRouter as Router } from 'react-router-dom';
import StegRoutes from './StegRoutes';
import SøknadSendt from '../søknadSendt/SøknadSendt';

interface Props {
    harSendtSøknad: boolean;
}

const SøknadRoutes: FunctionComponent<Props> = ({ harSendtSøknad }) => {
    return (
        <Router>
            <Switch>
                {harSendtSøknad
                    ? [
                          <Route path="/sendt" render={(routeProps) => <SøknadSendt {...routeProps} />} key="sendt" />,
                          <Redirect to="/sendt" key="redirect" />,
                      ]
                    : [
                          <Route path="/velkommen" render={(routeProps) => <Intro {...routeProps} />} key="intro" />,
                          <Route path="/soknad" render={(routeProps) => <StegRoutes {...routeProps} />} key="soknad" />,
                          <Redirect to="/velkommen" key="redirect" />,
                      ]}
            </Switch>
        </Router>
    );
};

export default SøknadRoutes;
