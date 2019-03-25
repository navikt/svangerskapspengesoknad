import { History } from 'history';
import { isEmpty } from 'lodash';

import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søknadsgrunnlag, UferdigSøknad } from 'app/types/Søknad';
import validerIntro from './validering/validerIntro';

export const getSøknadStepPath = (step: SøknadStep) => {
    let path = `/soknad/${step.step}`;
    return step.subStep ? path + `/${step.subStep}` : path;
};

function pureSplice<T>(array: Array<T>, start: number, deleteCount: number, ...substitutes: Array<T>): Array<T> {
    const newArray = [...array];
    newArray.splice(start, deleteCount, ...substitutes);

    return newArray;
}

const mainSteps = [
    StepID.TERMIN,
    StepID.ARBEIDSFORHOLD,
    StepID.TILRETTELEGGING,
    StepID.UTENLANDSOPPHOLD,
    StepID.OPPSUMMERING,
];

export const getAllSteps = (søknadsgrunnlag: Søknadsgrunnlag[]): SøknadStep[] => {
    const tilretteleggingSteps = søknadsgrunnlag.map((tilrettelegging) => ({
        step: StepID.TILRETTELEGGING,
        subStep: tilrettelegging.id,
    }));

    return pureSplice(
        mainSteps.map((step) => ({ step })),
        mainSteps.indexOf(StepID.TILRETTELEGGING),
        1,
        ...tilretteleggingSteps
    );
};

export const getAdjacentSteps = (currentStep: SøknadStep, allSteps: SøknadStep[]): [SøknadStep, SøknadStep] => {
    const invalidStep = { step: StepID.INGEN };
    const indexOfCurrentStep = allSteps.findIndex(
        ({ step, subStep }) => step === currentStep.step && subStep === currentStep.subStep
    );

    if (indexOfCurrentStep === -1) {
        return [invalidStep, invalidStep];
    }

    const isFirstStep = indexOfCurrentStep === 0;
    const isLastStep = indexOfCurrentStep === allSteps.length - 1;

    let previousStep = invalidStep;
    let nextStep = invalidStep;

    if (!isFirstStep) {
        previousStep = allSteps[indexOfCurrentStep - 1];
    }

    if (!isLastStep) {
        nextStep = allSteps[indexOfCurrentStep + 1];
    }

    return [previousStep, nextStep];
};

export const parseStepFromHistory = (history: History) => {
    const [, , step, subStep] = history.location.pathname.split('/');

    return {
        step,
        subStep,
    };
};

export const finnArbeidsgiversNavn = (arbeidsgiverId: string, arbeidsforhold: Arbeidsforhold[]) => {
    const matchingArbeidsforhold = arbeidsforhold.find((forhold) => forhold.arbeidsgiverId === arbeidsgiverId);
    let arbeidsgiverLabel: string = arbeidsgiverId;

    if (matchingArbeidsforhold) {
        arbeidsgiverLabel = matchingArbeidsforhold.arbeidsgiverNavn;
    }

    return arbeidsgiverLabel;
};

const terminAvailable = (values: UferdigSøknad) => {
    return isEmpty(validerIntro(values));
};

export const isAvailable = (path: StepID | string, values: UferdigSøknad): boolean => {
    switch (path) {
        case StepID.TERMIN:
            return terminAvailable(values);

        case 'SENDT':
            return values.harGodkjentOppsummering;
    }

    return true;
};
