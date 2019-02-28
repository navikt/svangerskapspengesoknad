import React, { FunctionComponent } from 'react';
import Intro from '../intro/Intro';
import SøknadSendt from '../søknadSendt/SøknadSendt';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import StegRoutes from './StegRoutes';

interface Props {
    harSendtSøknad: boolean;
}

const SøknadRoutes: FunctionComponent<Props> = ({ harSendtSøknad }) => {
    return (
        <Router>
            <Switch>
                {harSendtSøknad
                    ? [
                          <Route path="/sendt" component={SøknadSendt} key="sendt" />,
                          <Redirect to="/sendt" key="redirect" />,
                      ]
                    : [
                          <Route path="/velkommen" component={Intro} key="intro" />,
                          <Route path="/soknad" component={StegRoutes} key="soknad" />,
                          <Redirect to="/velkommen" key="redirect" />,
                      ]}
            </Switch>
        </Router>
    );
};

export default SøknadRoutes;
