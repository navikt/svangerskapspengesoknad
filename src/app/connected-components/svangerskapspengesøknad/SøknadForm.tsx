import React, { ReactNode, FunctionComponent } from 'react';
import { Formik } from 'formik';
import validerSøknad from 'app/utils/validering/validerSøknad';
import Søknad, { UferdigSøknad } from 'app/types/Søknad';
import Action from 'app/redux/types/Action';
import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { connect } from 'react-redux';
import processUtfyltSøknad from 'app/utils/processUtfyltSøknad';

interface Props {
    children: ReactNode;
}

interface DispatchProps {
    requestSendSøknad: (søknad: Søknad) => void;
}

const initialSøknad: UferdigSøknad = {
    harGodkjentVilkår: false,
    harGodkjentOppsummering: false,
    vedlegg: [],
    barn: {
        erBarnetFødt: false,
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
    },
    tilrettelegging: [],
};

const SøknadForm: FunctionComponent<Props & DispatchProps> = ({ requestSendSøknad, children }) => {
    return (
        <Formik
            initialValues={initialSøknad}
            onSubmit={(søknad: UferdigSøknad) => {
                const ferdigSøknad = processUtfyltSøknad(søknad);

                if (ferdigSøknad) {
                    requestSendSøknad(ferdigSøknad);
                }
            }}
            validate={validerSøknad}>
            {({ handleSubmit }) => children}
        </Formik>
    );
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: (søknad: Søknad) => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad } });
    },
});

export default connect(
    () => ({}),
    mapDispatchToProps
)(SøknadForm);
