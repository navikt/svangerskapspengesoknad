import React, { ReactNode, FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import Action from 'app/redux/types/Action';
import processUtfyltSøknad from 'app/utils/processUtfyltSøknad';
import Søknad, { UferdigSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { Søkerrolle } from 'app/types/Søker';

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
    tilrettelegging: [],
    søknadsgrunnlag: [],
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
    søker: {
        rolle: Søkerrolle.MOR,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        selvstendigNæringsdrivendeInformasjon: [],
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        andreInntekterSiste10Mnd: [],
    },
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
