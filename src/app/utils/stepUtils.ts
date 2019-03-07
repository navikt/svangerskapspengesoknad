import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import { History } from 'history';

export const getStegLabels = (
    søknadsgrunnlag: string[],
    arbeidsforhold: Arbeidsforhold[],
    intl: InjectedIntl
): string[] => {
    const tilretteleggingssteg: string[] = søknadsgrunnlag.map((arbeidsgiverId) => {
        const matchendeArbeidsforhold = arbeidsforhold.find((forhold) => forhold.arbeidsgiverId === arbeidsgiverId);
        return matchendeArbeidsforhold ? matchendeArbeidsforhold.arbeidsgiverNavn : '';
    });

    return [
        getMessage(intl, `stegtittel.${StepID.TERMIN}`),
        getMessage(intl, `stegtittel.${StepID.ARBEIDSFORHOLD}`),
        ...tilretteleggingssteg,
        getMessage(intl, `stegtittel.${StepID.OPPSUMMERING}`),
    ];
};

export const getSøknadStepPath = (step: SøknadStep) => {
    let path = `/soknad/${step.step}`;
    return step.subStep ? path + `/${step.subStep}` : path;
};

const mainSteps = [StepID.TERMIN, StepID.ARBEIDSFORHOLD, StepID.TILRETTELEGGING, StepID.OPPSUMMERING];

export const getAdjacentMainSteps = (stepID: StepID) => {
    const stegIndex = mainSteps.indexOf(stepID);
    const previousStep = stegIndex === 0 ? undefined : mainSteps[stegIndex - 1];
    const nextStep = stegIndex === mainSteps.length - 1 ? undefined : mainSteps[stegIndex + 1];

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
