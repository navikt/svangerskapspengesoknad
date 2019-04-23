import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import moment from 'moment';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { CustomFormikProps } from 'app/types/Formik';
import { FetchStatus } from 'app/types/FetchState';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { processUtfyltSøknad } from 'app/utils/søknadUtils';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import BekreftCheckboksPanel from 'app/formik/wrappers/BekreftCheckboksPanel';
import Block from 'common/components/block/Block';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import SøknadStep from 'app/types/SøknadStep';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Tilrettelegging from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import TilretteleggingOppsummering from './components/TilretteleggingOppsummering';
import ArbeidsforholdOppsummering from './components/ArbeidsforholdOppsummering';

import './oppsummering.less';
import MedlemskapOppsummering from './MedlemskapOppsummering';
import TerminOppsummering from './TerminOppsummering';
import SøknadDTO from '../../types/Søknad';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
    history: History;
}

interface StateProps {
    vedlegg: Attachment[];
    søkerinfo: Søkerinfo | undefined;
    arbeidsforhold: Arbeidsforhold[];
    requestSendSøknad: (søknad: SøknadDTO) => void;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

const Oppsummering: FunctionComponent<Props> = (props) => {
    const { step, vedlegg, søkerinfo, arbeidsforhold, requestSendSøknad, formikProps, history, intl } = props;
    const { values } = formikProps;

    const visAdvarselOmManglendeDokumentasjon = values.tilrettelegging.some(
        (t: Tilrettelegging) => t.vedlegg.length === 0
    );

    const sendSøknad = () => {
        const ferdigSøknad = processUtfyltSøknad(søkerinfo!.søker.fnr, values, vedlegg);
        if (ferdigSøknad) {
            requestSendSøknad(ferdigSøknad);
        }
    };

    if (søkerinfo === undefined) {
        return null;
    }

    return (
        <Applikasjonsside visTittel={true} visSpråkvelger={true}>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={true}
                onValidFormSubmit={sendSøknad}
                history={history}>
                <Block>
                    <Veilederinfo visVeileder={true} stil="kompakt" type="info">
                        <FormattedMessage id="oppsummering.veileder" />
                    </Veilederinfo>
                </Block>
                <Oppsummeringspunkt
                    type="termin"
                    title={getMessage(intl, 'oppsummering.termin.tittel.barnetErIkkeFødt')}>
                    <TerminOppsummering
                        fornavn={søkerinfo.søker.fornavn}
                        etternavn={søkerinfo.søker.etternavn}
                        fnr={søkerinfo.søker.fnr}
                    />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt type="barn" title={getMessage(intl, 'oppsummering.barn.tittel')}>
                    <FormattedMessage
                        id="oppsummering.barn.termindato"
                        values={{
                            dato: moment(values.barn.termindato).format('dddd Do MMMM YYYY')
                        }}
                    />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt
                    type="arbeidsforhold"
                    title={getMessage(intl, 'oppsummering.arbeidsforhold.tittel')}>
                    <ArbeidsforholdOppsummering
                        arbeidsforhold={arbeidsforhold}
                        søknadsgrunnlag={values.søknadsgrunnlag}
                        harHattAndreInntektskilder={values.søker.harHattAnnenInntektSiste10Mnd!}
                        harJobbetFrilans={values.søker.harJobbetSomFrilansSiste10Mnd!}
                        harJobbetSomSelvstendigNæringsdrivende={
                            values.søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd!
                        }
                    />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt
                    type="tilrettelegging"
                    title={getMessage(intl, 'oppsummering.tilrettelegging.tittel')}>
                    <TilretteleggingOppsummering
                        tilrettelegging={values.tilrettelegging}
                        arbeidsforhold={arbeidsforhold}
                    />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt type="medlemskap" title={getMessage(intl, 'oppsummering.medlemskap.tittel')}>
                    <MedlemskapOppsummering
                        iNorgeNeste12Mnd={values.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd!}
                        iNorgeSiste12Mnd={values.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd!}
                    />
                </Oppsummeringspunkt>
                <Block visible={visAdvarselOmManglendeDokumentasjon}>
                    <Veilederinfo stil="kompakt" type="advarsel">
                        <FormattedMessage id="oppsummering.veileder.dokumentasjon" />
                    </Veilederinfo>
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
    søkerinfo: state.api.søkerinfo.status === FetchStatus.SUCCESS ? state.api.søkerinfo.data : undefined,
    arbeidsforhold: state.api.søkerinfo.status === FetchStatus.SUCCESS ? state.api.søkerinfo.data.arbeidsforhold : [],
    vedlegg: state.attachment.vedlegg
});

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: (søknad: SøknadDTO) => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad } });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Oppsummering));
