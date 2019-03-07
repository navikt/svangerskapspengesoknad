import React from 'react';
import { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect as formConnect } from 'formik';
import { History } from 'history';

import { getSøknadStepPath, getAdjacentMainSteps } from 'app/utils/stepUtils';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Oppsummering from '../steg/Oppsummering';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Termin from '../steg/Termin';
import Arbeidsforhold from '../steg/Arbeidsforhold';
import { UferdigSøknad } from 'app/types/Søknad';
import { FormikProps } from 'app/types/Formik';
import Tilrettelegging from '../steg/Tilrettelegging';

interface Props {
    history: History;
}

const StegRoutes: FunctionComponent<Props & FormikProps> = ({ formik, history }) => {
    const { søknadsgrunnlag } = formik.values;

    const onNavigateToStep = (step: SøknadStep) => () => {
        history.push(getSøknadStepPath(step));
    };

    const getPropsForStep = (stepID: StepID) => {
        const [forrigeStegID, nesteStegID] = getAdjacentMainSteps(stepID);

        return {
            id: stepID,
            renderNesteknapp: !!nesteStegID,
            renderSendeknapp: !nesteStegID,
            onRequestNavigateToNextStep: nesteStegID
                ? onNavigateToStep({
                      step: nesteStegID,
                      subStep: nesteStegID === StepID.TILRETTELEGGING ? søknadsgrunnlag[0] : undefined,
                  })
                : undefined,
            onRequestNavigateToPreviousStep: forrigeStegID
                ? onNavigateToStep({
                      step: forrigeStegID,
                      subStep:
                          forrigeStegID === StepID.TILRETTELEGGING
                              ? søknadsgrunnlag[søknadsgrunnlag.length - 1]
                              : undefined,
                  })
                : undefined,
            history,
        };
    };

    const getPropsForTilretteleggingStep = (arbeidsgiverId: string) => {
        const [forrigeStegID, nesteStegID] = getAdjacentMainSteps(StepID.TILRETTELEGGING);
        const indexInOrder = søknadsgrunnlag.indexOf(arbeidsgiverId);

        let onRequestNavigateToPreviousStep = undefined;
        if (forrigeStegID) {
            onRequestNavigateToPreviousStep =
                indexInOrder === 0
                    ? onNavigateToStep({ step: forrigeStegID })
                    : onNavigateToStep({ step: StepID.TILRETTELEGGING, subStep: søknadsgrunnlag[indexInOrder - 1] });
        }

        let onRequestNavigateToNextStep = undefined;
        if (nesteStegID) {
            onRequestNavigateToNextStep =
                indexInOrder === søknadsgrunnlag.length - 1
                    ? onNavigateToStep({ step: nesteStegID })
                    : onNavigateToStep({ step: StepID.TILRETTELEGGING, subStep: søknadsgrunnlag[indexInOrder + 1] });
        }

        return {
            id: StepID.TILRETTELEGGING,
            renderNesteknapp: true,
            renderSendeknapp: false,
            onRequestNavigateToPreviousStep,
            onRequestNavigateToNextStep,
            history,
        };
    };

    const tilretteleggingRoutes = søknadsgrunnlag.map((arbeidsgiverId: string) => (
        <Route
            path={getSøknadStepPath({
                step: StepID.TILRETTELEGGING,
                subStep: arbeidsgiverId,
            })}
            exact={false}
            key={`${StepID.TILRETTELEGGING}.${arbeidsgiverId}`}
            component={() => <Tilrettelegging {...getPropsForTilretteleggingStep(arbeidsgiverId)} />}
        />
    ));

    return (
        <Applikasjonsside visSpråkvelger={true} visTittel={true}>
            <Switch>
                <Route
                    path={getSøknadStepPath({ step: StepID.TERMIN })}
                    key={StepID.TERMIN}
                    component={() => <Termin {...getPropsForStep(StepID.TERMIN)} />}
                />
                <Route
                    path={getSøknadStepPath({ step: StepID.ARBEIDSFORHOLD })}
                    key={StepID.ARBEIDSFORHOLD}
                    component={() => <Arbeidsforhold {...getPropsForStep(StepID.ARBEIDSFORHOLD)} />}
                />
                {søknadsgrunnlag.length > 0 && [tilretteleggingRoutes]}
                <Route
                    path={getSøknadStepPath({ step: StepID.OPPSUMMERING })}
                    key={StepID.OPPSUMMERING}
                    component={() => <Oppsummering {...getPropsForStep(StepID.OPPSUMMERING)} />}
                />
                <Redirect to={getSøknadStepPath({ step: StepID.TERMIN })} />
            </Switch>
        </Applikasjonsside>
    );
};

export default formConnect<Props, UferdigSøknad>(StegRoutes);
