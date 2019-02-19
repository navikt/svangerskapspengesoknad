import Søknad, { UferdigSøknad, Søknadstype } from 'app/types/Søknad';
import SøknadAction, { SøknadActionTypes } from '../types/SøknadAction';

export const mockedSøknad: Søknad = {
    type: Søknadstype.SVANGERSKAPSPENGER,
    vedlegg: [],
    erEndringssøknad: false,
    barn: {
        erBarnetFødt: false,
        termindato: '2019-02-02T11:00:00.000Z',
    },
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
};

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
