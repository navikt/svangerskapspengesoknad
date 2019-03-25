/*import React from 'react';
import { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { History } from 'history';

import { getSøknadStepPath, getAdjacentSteps, getAllSteps } from 'app/utils/stepUtils';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Termin from '../steg/Termin';
import Arbeidsforhold from '../steg/Arbeidsforhold';
import { FormikProps, CustomFormikProps } from 'app/types/Formik';
import Tilrettelegging from '../steg/Tilrettelegging';
import { StegProps } from 'app/components/steg/Steg';

interface Props {
    history: History;
    formik: CustomFormikProps;
}

const StegRoutes: FunctionComponent<Props & FormikProps> = ({ formik, history }) => {
    const { søknadsgrunnlag } = formik.values;
    const allSøknadSteps = getAllSteps(søknadsgrunnlag);

    const onNavigateToPreviousStep = (step: SøknadStep) => () => {
        if (step.step !== StepID.INGEN) {
            formik.setFormikState({ submitCount: 0 });
            history.push(getSøknadStepPath(step));
        }
    };

    const getPropsForStep = (step: SøknadStep): StegProps => {
        const [previousStep, nextStep] = getAdjacentSteps(step, allSøknadSteps);

        return {
            id: step.step,
            renderNesteknapp: nextStep.step !== StepID.INGEN,
            renderSendeknapp: nextStep.step === StepID.INGEN,
            renderTilbakeknapp: previousStep.step !== StepID.INGEN,
            onRequestNavigateToPreviousStep: onNavigateToPreviousStep(previousStep),
            nextStep: nextStep.step,
            allSøknadSteps,
            handleSubmit: formik.handleSubmit,
            history,
            formik,
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
                render={() => (
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
                    render={() => <Termin {...getPropsForStep({ step: StepID.TERMIN })} />}
                />

                <Route
                    path={getSøknadStepPath({ step: StepID.ARBEIDSFORHOLD })}
                    key={StepID.ARBEIDSFORHOLD}
                    render={() => <Arbeidsforhold {...getPropsForStep({ step: StepID.ARBEIDSFORHOLD })} />}
                />

                
                {søknadsgrunnlag.length > 0 && [tilretteleggingRoutes]}
                <Route
                    path={getSøknadStepPath({ step: StepID.UTENLANDSOPPHOLD })}
                    key={StepID.UTENLANDSOPPHOLD}
                    render={() => <Utenlandsopphold {...getPropsForStep({ step: StepID.UTENLANDSOPPHOLD })} />}
                />
                <Route
                    path={getSøknadStepPath({ step: StepID.OPPSUMMERING })}
                    key={StepID.OPPSUMMERING}
                    render={() => <Oppsummering {...getPropsForStep({ step: StepID.OPPSUMMERING })} />}
                />
                
                <Redirect to={getSøknadStepPath({ step: StepID.TERMIN })} />
            </Switch>
        </Applikasjonsside>
    );
};

export default StegRoutes;
*/
