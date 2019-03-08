import React from 'react';
import { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect as formConnect } from 'formik';
import { History } from 'history';

import { getSøknadStepPath, getAdjacentSteps, getAllSteps } from 'app/utils/stepUtils';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Oppsummering from '../steg/Oppsummering';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Termin from '../steg/Termin';
import Arbeidsforhold from '../steg/Arbeidsforhold';
import { UferdigSøknad } from 'app/types/Søknad';
import { FormikProps } from 'app/types/Formik';
import Tilrettelegging from '../steg/Tilrettelegging';
import { StegProps } from 'app/components/steg/Steg';

interface Props {
    history: History;
}

const StegRoutes: FunctionComponent<Props & FormikProps> = ({ formik, history }) => {
    const { søknadsgrunnlag } = formik.values;
    const allSøknadSteps = getAllSteps(søknadsgrunnlag);

    const onNavigateToStep = (step: SøknadStep) => () => {
        if (step.step !== StepID.INGEN) {
            history.push(getSøknadStepPath(step));
        }
    };

    const getPropsForStep = (step: SøknadStep): StegProps => {
        const [previousStep, nextStep] = getAdjacentSteps(step, allSøknadSteps);

        return {
            id: step.step,
            renderNesteknapp: nextStep.step !== StepID.INGEN,
            renderSendeknapp: nextStep.step === StepID.INGEN,
            onRequestNavigateToNextStep: onNavigateToStep(nextStep),
            onRequestNavigateToPreviousStep: onNavigateToStep(previousStep),
            allSøknadSteps,
            history,
        };
    };

    const getPropsForTilrettelegging = (id: string, index: number) => ({
        tilretteleggingId: id,
        tilretteleggingIndex: index,
    });

    const tilretteleggingRoutes = søknadsgrunnlag.map(({ id }, index) => {
        const tilrettelegginStep = {
            step: StepID.TILRETTELEGGING,
            subStep: id,
        };

        return (
            <Route
                path={getSøknadStepPath(tilrettelegginStep)}
                exact={false}
                key={`${StepID.TILRETTELEGGING}.${id}`}
                component={() => (
                    <Tilrettelegging
                        {...getPropsForStep(tilrettelegginStep)}
                        {...getPropsForTilrettelegging(id, index)}
                    />
                )}
            />
        );
    });

    return (
        <Applikasjonsside visSpråkvelger={true} visTittel={true}>
            <Switch>
                <Route
                    path={getSøknadStepPath({ step: StepID.TERMIN })}
                    key={StepID.TERMIN}
                    component={() => <Termin {...getPropsForStep({ step: StepID.TERMIN })} />}
                />
                <Route
                    path={getSøknadStepPath({ step: StepID.ARBEIDSFORHOLD })}
                    key={StepID.ARBEIDSFORHOLD}
                    component={() => <Arbeidsforhold {...getPropsForStep({ step: StepID.ARBEIDSFORHOLD })} />}
                />
                {søknadsgrunnlag.length > 0 && [tilretteleggingRoutes]}
                <Route
                    path={getSøknadStepPath({ step: StepID.OPPSUMMERING })}
                    key={StepID.OPPSUMMERING}
                    component={() => <Oppsummering {...getPropsForStep({ step: StepID.OPPSUMMERING })} />}
                />
                <Redirect to={getSøknadStepPath({ step: StepID.TERMIN })} />
            </Switch>
        </Applikasjonsside>
    );
};

export default formConnect<Props, UferdigSøknad>(StegRoutes);
