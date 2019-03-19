import React, { ReactNode, FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import Action from 'app/redux/types/Action';
import processUtfyltSøknad from 'app/utils/processUtfyltSøknad';
import Søknad, { UferdigSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { Søkerrolle } from 'app/types/Søker';
import { State } from 'app/redux/store';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface Props {
    children: ReactNode;
}

interface StateProps {
    vedlegg: Attachment[];
    requestSendSøknad: (søknad: Søknad) => void;
}

const initialSøknad: UferdigSøknad = {
    harGodkjentVilkår: false,
    harGodkjentOppsummering: false,
    barn: {},
    tilrettelegging: [],
    søknadsgrunnlag: [],
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
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

const SøknadForm: FunctionComponent<Props & StateProps> = (props) => {
    const { requestSendSøknad, vedlegg, children } = props;

    return (
        <Formik
            initialValues={initialSøknad}
            onSubmit={(søknad: UferdigSøknad) => {
                const ferdigSøknad = processUtfyltSøknad(søknad, vedlegg);

                if (ferdigSøknad) {
                    requestSendSøknad(ferdigSøknad);
                }
            }}
            validate={validerSøknad}>
            {() => <Form>{children}</Form>}
        </Formik>
    );
};

const mapStateToProps = (state: State) => ({
    vedlegg: state.attachment.vedlegg,
});

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: (søknad: Søknad) => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad } });
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SøknadForm);
