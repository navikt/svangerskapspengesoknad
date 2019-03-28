import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { AppRoute } from 'app/types/Routes';
import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { StepID } from 'app/types/SøknadStep';
import Arbeidsforhold from '../arbeidsforhold/Arbeidsforhold';
import history from 'app/utils/history';
import Intro from '../intro/Intro';
import Oppsummering from '../oppsummering/Oppsummering';
import SøknadSendt from '../søknad-sendt/SøknadSendt';
import Termin from '../termin/Termin';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import Utenlandsopphold from '../utenlandsopphold/Utenlandsopphold';

interface Props {
    harSendtSøknad: boolean;
    formikProps: CustomFormikProps;
}

const SøknadRoutes: FunctionComponent<Props> = ({ formikProps, harSendtSøknad }) => {
    const { values } = formikProps;

    const tilretteleggingRoutes = values.søknadsgrunnlag.map(({ id }) => {
        const søknadStep = {
            step: StepID.TILRETTELEGGING,
            subStep: id,
        };

        return (
            <Route
                path={getSøknadStepPath(søknadStep.step, søknadStep.subStep)}
                exact={false}
                key={`${StepID.TILRETTELEGGING}.${id}`}
                render={(props) => <Tilrettelegging id={id} step={søknadStep} formikProps={formikProps} {...props} />}
            />
        );
    });

    const søknadRoutes = (
        <Switch>
            <Route path={AppRoute.INTRO} render={(routeProps) => <Intro formik={formikProps} {...routeProps} />} />

            <Route
                path={getSøknadStepPath(StepID.TERMIN)}
                key={StepID.TERMIN}
                render={(props) => <Termin step={{ step: StepID.TERMIN }} formikProps={formikProps} {...props} />}
            />

            <Route
                path={getSøknadStepPath(StepID.ARBEIDSFORHOLD)}
                key={StepID.ARBEIDSFORHOLD}
                render={(props) => (
                    <Arbeidsforhold step={{ step: StepID.ARBEIDSFORHOLD }} formikProps={formikProps} {...props} />
                )}
            />

            {values.søknadsgrunnlag.length > 0 && [tilretteleggingRoutes]}

            <Route
                path={getSøknadStepPath(StepID.UTENLANDSOPPHOLD)}
                key={StepID.UTENLANDSOPPHOLD}
                render={(props) => (
                    <Utenlandsopphold step={{ step: StepID.UTENLANDSOPPHOLD }} formikProps={formikProps} {...props} />
                )}
            />

            <Route
                path={getSøknadStepPath(StepID.OPPSUMMERING)}
                key={StepID.OPPSUMMERING}
                render={(props) => (
                    <Oppsummering step={{ step: StepID.OPPSUMMERING }} formikProps={formikProps} {...props} />
                )}
            />

            <Redirect to={AppRoute.INTRO} key="redirect" />
        </Switch>
    );

    const kvitteringRoute = (
        <Switch>
            <Route path={AppRoute.SENDT} render={(routeProps) => <SøknadSendt {...routeProps} />} />
            <Redirect to={AppRoute.SENDT} key="redirect" />
        </Switch>
    );

    return <Router history={history}>{harSendtSøknad ? kvitteringRoute : søknadRoutes}</Router>;
};

export default SøknadRoutes;
