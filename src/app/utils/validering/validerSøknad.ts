import { FormikErrors } from 'formik';

import { SummaryError } from 'common/lib/validation/types';
import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validerIntro from './validerIntro';
import validerTermin from './validerTermin';
import { StepID } from 'app/types/SøknadStep';
import validerTilrettelegging from './validerTilrettelegging';
import { SøknadRoute, AppRoute } from 'app/types/Routes';

const validerSøknad = ({ path, step, subStep }: SøknadRoute) => (søknad: UferdigSøknad): Søknadfeil => {
    if (path === AppRoute.INTRO) {
        return {
            ...validerIntro(søknad),
        };
    } else if (step) {
        switch (step) {
            case StepID.TERMIN:
                return {
                    ...validerIntro(søknad),
                    ...validerTermin(søknad),
                };

            case StepID.ARBEIDSFORHOLD:
                return {
                    ...validerIntro(søknad),
                    ...validerTermin(søknad),
                };

            case StepID.TILRETTELEGGING:
                return {
                    ...validerIntro(søknad),
                    ...validerTermin(søknad),
                    ...validerTilrettelegging(søknad),
                };

            case StepID.OPPSUMMERING:
                return {
                    // ...validerOppsummering(søknad),
                };
        }
    }

    return {};
};

export const containsErrors = (item: any): boolean => {
    if (typeof item === 'string' && item !== '') {
        return true;
    } else if (Array.isArray(item)) {
        for (const member of item) {
            if (containsErrors(member)) {
                return true;
            }
        }
    } else if (typeof item === 'object') {
        for (const property of Object.keys(item)) {
            if (containsErrors(item[property])) {
                return true;
            }
        }
    }

    return false;
};

export const flattenErrors = (errors: FormikErrors<UferdigSøknad>, pathPrefix = ''): SummaryError[] => {
    let flattened: SummaryError[] = [];

    for (const key of Object.keys(errors)) {
        const prefix = pathPrefix ? `${pathPrefix}.${key}` : key;

        if (typeof errors[key] === 'string') {
            flattened.push({
                name: prefix,
                text: errors[key],
            });
        } else if (typeof errors[key] === 'object') {
            flattened = flattened.concat(flattenErrors(errors[key], prefix));
        }
    }

    return flattened;
};

export default validerSøknad;
