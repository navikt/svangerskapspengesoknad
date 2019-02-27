import React, { FunctionComponent } from 'react';
import Intro from '../intro/Intro';
import Søknad from '../søknad/Søknad';
import SøknadSendt from '../søknadSendt/SøknadSendt';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { connect as formConnect } from 'formik';
import { FormikProps } from 'app/types/Formik';

interface Props {
    harSendtSøknad: boolean;
}

const SøknadRoutes: FunctionComponent<Props & FormikProps> = ({ harSendtSøknad, formik }) => {
    const routes: JSX.Element | JSX.Element[] = [];

    if (harSendtSøknad) {
        routes.push(<Route path="/sendt" component={SøknadSendt} exact={true} key="completed" />);
    } else {
        routes.push(<Route path="/introduksjon" component={Intro} key="intro" />);

        if (formik.values.harGodkjentVilkår) {
            routes.push(<Route path="/soknad" component={Søknad} exact={true} key="soknad" />);
        }
    }

    return (
        <Router>
            <Switch>
                {routes}
                <Redirect to="/introduksjon" />
            </Switch>
        </Router>
    );
};

export default formConnect<Props>(SøknadRoutes);
