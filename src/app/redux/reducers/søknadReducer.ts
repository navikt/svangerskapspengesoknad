import { UferdigSøknad } from 'app/types/Søknad';
import { SøknadAction, SøknadActionTypes } from '../types/Action';

const getDefaultState = (): UferdigSøknad => ({
    harGodkjentVilkår: false,
    harGodkjentOppsummering: false,
    erEndringssøknad: false,
    vedlegg: [],
    barn: {
        erBarnetFødt: false,
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
    },
});

const søknadReducer = (state = getDefaultState(), action: SøknadAction) => {
    switch (action.type) {
        case SøknadActionTypes.SET_VILKÅR_GODKJENT: {
            return {
                ...state,
                harGodkjentVilkår: action.payload.vilkårErGodkjent,
            };
        }

        case SøknadActionTypes.SET_OPPSUMMERING_GODKJENT: {
            return {
                ...state,
                harGodkjentOppsummering: action.payload.oppsummeringErGodkjent,
            };
        }

        default: {
            return state;
        }
    }
};

export default søknadReducer;
