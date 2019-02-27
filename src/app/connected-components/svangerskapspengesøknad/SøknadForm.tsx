import React, { ReactNode, FunctionComponent } from 'react';
import { Formik } from 'formik';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { UferdigSøknad } from 'app/types/Søknad';
import Action from 'app/redux/types/Action';
import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { connect } from 'react-redux';

interface Props {
    children: ReactNode;
}

interface DispatchProps {
    requestSendSøknad: (søknad: UferdigSøknad) => void;
}

const initialSøknad: UferdigSøknad = {
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
};

/*
export const mockedSøknad: any = {
    type: Søknadstype.SVANGERSKAPSPENGER,
    vedlegg: [],
    erEndringssøknad: false,
    barn: {
        erBarnetFødt: false,
        termindato: new Date('2019-09-01'),
    },
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
    tilrettelegging: [
        {
            behovForTilretteleggingFom: new Date('2019-03-01'),
            arbeidsgiverId: '973135678',
        }
    ],
}
*/

const SøknadForm: FunctionComponent<Props & DispatchProps> = ({ requestSendSøknad, children }) => {
    return (
        <Formik
            initialValues={initialSøknad}
            onSubmit={(søknad: UferdigSøknad) => {
                console.warn('Sending søknad!');
                requestSendSøknad(søknad);
            }}
            validate={validerSøknad}>
            {({ handleSubmit }) => children}
        </Formik>
    );
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: (søknad: UferdigSøknad) => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad } });
    },
});

export default connect(
    () => ({}),
    mapDispatchToProps
)(SøknadForm);
