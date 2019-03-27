import React, { FunctionComponent } from 'react';

import { CustomFormikProps } from 'app/types/Formik';
import Søknad from 'app/types/Søknad';
import Block from 'common/components/block/Block';
import FormikStep from 'app/components/formikStep/FormikStep';
import Action from 'app/redux/types/Action';
import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { connect } from 'react-redux';
import SøknadStep from 'app/types/SøknadStep';
import { History } from 'history';
import processUtfyltSøknad from 'app/utils/processUtfyltSøknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { State } from 'app/redux/store';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
    history: History;
}

interface StateProps {
    vedlegg: Attachment[];
    requestSendSøknad: (søknad: Søknad) => void;
}

type Props = OwnProps & StateProps;

const Oppsummering: FunctionComponent<Props> = (props) => {
    const { step, vedlegg, requestSendSøknad, formikProps, history } = props;
    const { values } = formikProps;

    const sendSøknad = () => {
        const ferdigSøknad = processUtfyltSøknad(values, vedlegg);

        if (ferdigSøknad) {
            requestSendSøknad(ferdigSøknad);
        }
    };

    return (
        <FormikStep
            step={step}
            formikProps={formikProps}
            showNesteknapp={true}
            onValidFormSubmit={sendSøknad}
            history={history}>
            <Block>
                <code
                    id="oppsummering-placeholder"
                    style={{
                        wordWrap: 'break-word',
                    }}>
                    {JSON.stringify(values)}
                </code>
            </Block>
        </FormikStep>
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
)(Oppsummering);
