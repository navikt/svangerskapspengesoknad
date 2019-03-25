import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Intro from '../intro/Intro';
import { BrowserRouter as Router } from 'react-router-dom';
import SøknadSendt from '../søknadSendt/SøknadSendt';
import { StepID } from 'app/types/SøknadStep';
import { CustomFormikProps } from 'app/types/Formik';
import { isAvailable, getSøknadStepPath } from 'app/utils/stepUtils';
import Termin from '../steg/Termin';

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
                    path={getSøknadStepPath({ step: StepID.TERMIN })}
                    key={StepID.TERMIN}
                    render={(props) => <Termin step={{ step: StepID.TERMIN }} formikProps={formikProps} {...props} />}
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

                {isAvailable('SENDT', values) && (
                    <Route path="/sendt" render={(routeProps) => <SøknadSendt {...routeProps} />} key="sendt" />
                )}

                <Redirect to="/velkommen" key="redirect" />
            </Switch>
        </Router>
    );
};

export default SøknadRoutes;
