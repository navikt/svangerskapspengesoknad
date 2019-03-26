import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { BrowserRouter as Router } from 'react-router-dom';
import { CustomFormikProps } from 'app/types/Formik';
import { isAvailable, getSøknadStepPath } from 'app/utils/stepUtils';
import { StepID } from 'app/types/SøknadStep';
import Intro from '../intro/Intro';
import SøknadSendt from '../søknadSendt/SøknadSendt';
import Termin from '../steg/Termin';
import Arbeidsforhold from '../steg/Arbeidsforhold';

interface Props {
    formikProps: CustomFormikProps;
}

const SøknadRoutes: FunctionComponent<Props> = ({ formikProps }) => {
    const { values } = formikProps;

    return (
        <Router>
            <Switch>
                <Route path="/velkommen" render={(routeProps) => <Intro formik={formikProps} {...routeProps} />} />

                <Route
                    path="/soknad/termin"
                    //path={getSøknadStepPath({ step: StepID.TERMIN })}
                    key={StepID.TERMIN}
                    render={(props) => <Termin step={{ step: StepID.TERMIN }} formikProps={formikProps} {...props} />}
                />

                <Route
                    path="/soknad/arbeidsforhold"
                    //path={getSøknadStepPath({ step: StepID.ARBEIDSFORHOLD })}
                    key={StepID.ARBEIDSFORHOLD}
                    render={(props) => (
                        <Arbeidsforhold step={{ step: StepID.ARBEIDSFORHOLD }} formikProps={formikProps} {...props} />
                    )}
                />

                {/*
                <Route
                    path={getSøknadStepPath({ step: StepID.ARBEIDSFORHOLD })}
                    key={StepID.ARBEIDSFORHOLD}
                    render={(props) => (
                        <Arbeidsforhold step={{ step: StepID.ARBEIDSFORHOLD }} formikProps={formikProps} {...props} />
                    )}
                />
                    */}

                {/*isAvailable(StepID.TERMIN, values) && (
                    <Route
                        path={getSøknadStepPath({ step: StepID.TERMIN })}
                        key={StepID.TERMIN}
                        render={(props) => (
                            <Termin step={{ step: StepID.TERMIN }} formikProps={formikProps} {...props} />
                        )}
                    />
                        )*/}

                {/*isAvailable(StepID.ARBEIDSFORHOLD, values) && (
                    <Route
                        path={getSøknadStepPath({ step: StepID.ARBEIDSFORHOLD })}
                        key={StepID.ARBEIDSFORHOLD}
                        render={(props) => <Arbeidsforhold formikProps={formikProps} {...props} />}
                    />
                )*/}

                {isAvailable('SENDT') && (
                    <Route path="/sendt" render={(routeProps) => <SøknadSendt {...routeProps} />} key="sendt" />
                )}

                <Redirect to="/velkommen" key="redirect" />
            </Switch>
        </Router>
    );
};

export default SøknadRoutes;
