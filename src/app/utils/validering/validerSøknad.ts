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

            case StepID.UTENLANDSOPPHOLD:
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

export default validerSøknad;
