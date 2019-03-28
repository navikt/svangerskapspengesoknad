import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validateIntro from './validateIntro';
import validateTermin from './validateTermin';
import { StepID } from 'app/types/SøknadStep';
import { SøknadRoute, AppRoute } from 'app/types/Routes';
import validateTilrettelegging from './validateTilrettelegging';

const validateSøknad = (route: SøknadRoute) => (values: UferdigSøknad): Søknadfeil => {
    switch (route.path) {
        case AppRoute.INTRO:
            return validateIntro(values);

        case AppRoute.SØKNAD:
            return validateUntilStep(route.step, values);

        default:
            return {};
    }
};

const validateUntilStep = (step: StepID = StepID.INGEN, values: UferdigSøknad): Søknadfeil => {
    switch (step) {
        case StepID.TERMIN:
            return {
                ...validateIntro(values),
                ...validateTermin(values),
            };

        case StepID.ARBEIDSFORHOLD:
            return validateUntilStep(StepID.TERMIN, values);

        case StepID.TILRETTELEGGING:
            return {
                ...validateUntilStep(StepID.ARBEIDSFORHOLD, values),
                ...validateTilrettelegging(values),
            };

        case StepID.UTENLANDSOPPHOLD:
            return validateUntilStep(StepID.TILRETTELEGGING, values);

        case StepID.OPPSUMMERING:
            return validateUntilStep(StepID.UTENLANDSOPPHOLD, values);

        case StepID.INGEN:
            return {};
    }
};

/*
const untilTermin = (values: UferdigSøknad) => ({
    ...validateIntro(values),
    ...validateTermin(values),
});

const untilArbeidsforhold = (values: UferdigSøknad) => untilTermin(values);

const untilTilrettelegging = (values: UferdigSøknad) => ({
    ...untilArbeidsforhold(values),
    ...validateTilrettelegging(values),
});

const untilUtenlandsopphold = (values: UferdigSøknad) => untilTilrettelegging(values);

const untilOppsummering = (values: UferdigSøknad) => untilUtenlandsopphold(values);

const validateSteps = (values: UferdigSøknad, step: StepID): Søknadfeil => {
    switch (step) {
        case StepID.TERMIN:
            return untilTermin(values);

        case StepID.ARBEIDSFORHOLD:
            return untilArbeidsforhold(values);

        case StepID.TILRETTELEGGING:
            return untilTilrettelegging(values);

        case StepID.UTENLANDSOPPHOLD:
            return untilUtenlandsopphold(values);

        case StepID.OPPSUMMERING:
            return untilOppsummering(values);

        default:
            return {};
    }
};
*/

export default validateSøknad;
