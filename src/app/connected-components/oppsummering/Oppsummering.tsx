import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { CustomFormikProps } from 'app/types/Formik';
import { processUtfyltSøknad } from 'app/utils/søknadUtils';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Block from 'common/components/block/Block';
import FormikStep from 'app/components/formik-step/FormikStep';
import Søknad from 'app/types/Søknad';
import SøknadStep from 'app/types/SøknadStep';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import getMessage from 'common/util/i18nUtils';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import BekreftCheckboksPanel from 'app/formik/wrappers/BekreftCheckboksPanel';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
    history: History;
}

interface StateProps {
    vedlegg: Attachment[];
    requestSendSøknad: (søknad: Søknad) => void;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

const Oppsummering: FunctionComponent<Props> = (props) => {
    const { step, vedlegg, requestSendSøknad, formikProps, history, intl } = props;
    const { values } = formikProps;

    const sendSøknad = () => {
        const ferdigSøknad = processUtfyltSøknad(values, vedlegg);

        if (ferdigSøknad) {
            requestSendSøknad(ferdigSøknad);
        }
    };

    return (
        <Applikasjonsside visTittel visSpråkvelger>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={true}
                onValidFormSubmit={sendSøknad}
                history={history}>
                <Block>
                    <Veilederinfo visVeileder stil="kompakt" type="info">
                        <FormattedMessage id="oppsummering.veileder" />
                    </Veilederinfo>
                </Block>
                <Block>
                    <code
                        id="oppsummering-placeholder"
                        style={{
                            wordWrap: 'break-word',
                        }}>
                        {JSON.stringify(values)}
                    </code>
                </Block>
                <Block>
                    <BekreftCheckboksPanel
                        name="harGodkjentOppsummering"
                        label={getMessage(intl, 'oppsummering.harGodkjentVilkår')}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
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
)(injectIntl(Oppsummering));
