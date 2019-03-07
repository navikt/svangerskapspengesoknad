import React, { ReactNode, FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import Action from 'app/redux/types/Action';
import processUtfyltSøknad from 'app/utils/processUtfyltSøknad';
import Søknad, { UferdigSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';

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
    barn: {},
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
    },
    tilrettelegging: [],
    søknadsgrunnlag: [],
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
            {({ handleSubmit }) => <Form>{children}</Form>}
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
