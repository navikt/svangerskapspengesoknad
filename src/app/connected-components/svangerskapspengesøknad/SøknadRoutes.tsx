import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { BrowserRouter as Router } from 'react-router-dom';
import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { StepID } from 'app/types/SøknadStep';
import Intro from '../intro/Intro';
import SøknadSendt from '../søknadSendt/SøknadSendt';
import Termin from '../steg/Termin';
import Arbeidsforhold from '../steg/Arbeidsforhold';
import Tilrettelegging from '../steg/Tilrettelegging';
import Utenlandsopphold from '../steg/utenlandsopphold/Utenlandsopphold';
import Oppsummering from '../steg/Oppsummering';
import { AppRoute } from 'app/types/Routes';

interface Props {
    harSendtSøknad: boolean;
    formikProps: CustomFormikProps;
}

const SøknadRoutes: FunctionComponent<Props> = ({ formikProps, harSendtSøknad }) => {
    const { values } = formikProps;

    const getPropsForTilrettelegging = (id: string, index: number) => ({
        tilretteleggingId: id,
        tilretteleggingIndex: index,
    });

    const tilretteleggingRoutes = values.søknadsgrunnlag.map(({ id }, index) => {
        const søknadStep = {
            step: StepID.TILRETTELEGGING,
            subStep: id,
        };

        return (
            <Route
                path={getSøknadStepPath(søknadStep.step, søknadStep.subStep)}
                exact={false}
                key={`${StepID.TILRETTELEGGING}.${id}`}
                render={(props) => (
                    <Tilrettelegging
                        step={søknadStep}
                        formikProps={formikProps}
                        {...props}
                        {...getPropsForTilrettelegging(id, index)}
                    />
                )}
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
            [
            <Route path={AppRoute.SENDT} render={(routeProps) => <SøknadSendt {...routeProps} />} />,
            <Redirect to={AppRoute.SENDT} key="redirect" />, ]
        </Switch>
    );

    return <Router>{harSendtSøknad ? kvitteringRoute : søknadRoutes}</Router>;
};

export default SøknadRoutes;
