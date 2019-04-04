import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'app/utils/bem';
import moment from 'moment';

import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FetchStatus } from 'app/types/FetchState';
import { CustomFormikProps } from 'app/types/Formik';
import { mergeSøknadsgrunnlagIntoTilrettelegging } from 'app/utils/tilretteleggingUtils';
import { State } from 'app/redux/store';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import VelgSøknadsgrunnlag from 'app/formik/wrappers/VelgSøknadsgrunnlag';
import Arbeidsforholdseksjon from './ArbeidSeksjon';
import SelvstendigNæringsdrivende from './SelvstendigNæringsdrivende/SelvstendigNæringsdrivende';
import AndreInntekter from './AndreInntekter/AndreInntekter';
import FrilansSpørsmål from './Frilans/FrilansSpørsmål';

import FormikStep from 'app/components/formik-step/FormikStep';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import { StepProps } from 'app/components/step/Step';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { navigateTo } from 'app/utils/navigationUtils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentActionTypes } from 'app/redux/types/AttachmentAction';
import Action from 'app/redux/types/Action';

import './arbeidsforhold.less';

const cls = BEMHelper('arbeidsforhold');

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

interface ConnectProps {
    arbeidsforhold: Arbeidsforhold[];
    uploadAttachment: (attachment: Attachment, id: string) => void;
    deleteAttachment: (attachment: Attachment, id: string) => void;
}

type Props = OwnProps & StepProps & ConnectProps & InjectedIntlProps;

const Arbeidsforhold: FunctionComponent<Props> = (props: Props) => {
    const { step, formikProps, arbeidsforhold, intl, history } = props;
    const { values, setFieldValue } = formikProps;
    const { søker, søknadsgrunnlag } = values;
    const { frilansInformasjon } = søker;

    const harValgtMinstEttGrunnlag: boolean =
        søknadsgrunnlag.length > 0 ||
        søker.harJobbetSomFrilansSiste10Mnd === true ||
        (søker.andreInntekterSiste10Mnd !== undefined && søker.andreInntekterSiste10Mnd.length > 0) ||
        (søker.selvstendigNæringsdrivendeInformasjon !== undefined &&
            søker.selvstendigNæringsdrivendeInformasjon.length > 0);

    const prepareTilrettelegging = () => {
        setFieldValue(
            'tilrettelegging',
            mergeSøknadsgrunnlagIntoTilrettelegging(values.søknadsgrunnlag, values.tilrettelegging)
        );
    };

    const navigate = () => {
        prepareTilrettelegging();

        const pathToFirstTilrettelegging = getSøknadStepPath(StepID.TILRETTELEGGING, values.søknadsgrunnlag[0].id);
        navigateTo(pathToFirstTilrettelegging, history);
    };

    const visKomponent = {
        harJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon:
            søker.harJobbetSomFrilansSiste10Mnd === false ||
            (frilansInformasjon && frilansInformasjon.driverFosterhjem !== undefined),
        harHattAnnenInntektSiste10Mnd:
            (søker.selvstendigNæringsdrivendeInformasjon && søker.selvstendigNæringsdrivendeInformasjon.length > 0) ||
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false,
        ingenArbeidsforholdVeileder:
            (!harValgtMinstEttGrunnlag &&
                (søker.selvstendigNæringsdrivendeInformasjon &&
                    søker.selvstendigNæringsdrivendeInformasjon.length > 0)) ||
            (søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false &&
                søker.harHattAnnenInntektSiste10Mnd === false),
    };

    return (
        <Applikasjonsside visTittel visSpråkvelger>
            <FormikStep
                step={step}
                className={cls.block}
                formikProps={formikProps}
                showNesteknapp={harValgtMinstEttGrunnlag}
                onValidFormSubmit={navigate}
                history={history}>
                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.label'),
                    }}>
                    <Normaltekst>{getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.text')}</Normaltekst>
                </Block>
                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.label'),
                        info: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.infotekst'),
                    }}>
                    <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
                </Block>
                <Block margin="s">
                    <Veilederinfo type="info" stil="kompakt">
                        {getMessage(intl, 'arbeidsforhold.veileder.inntektsmelding', {
                            // TODO: Hva er riktig dato her?
                            datoTidligst: moment().format('DD.MM.YYYY'),
                        })}
                    </Veilederinfo>
                </Block>
                <Block margin="l">
                    <VelgSøknadsgrunnlag
                        name="søknadsgrunnlag"
                        label={getMessage(intl, 'arbeidsforhold.grunnlag.label')}
                        options={arbeidsforhold.map((forhold: Arbeidsforhold) => ({
                            value: forhold.arbeidsgiverId,
                            label: forhold.arbeidsgiverNavn,
                            type: Arbeidsforholdstype.VIRKSOMHET,
                        }))}
                    />
                </Block>
                <Block>
                    <FrilansSpørsmål formikProps={formikProps} />
                </Block>
                <Block visible={visKomponent.harJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon}>
                    <Arbeidsforholdseksjon
                        name="søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
                        listName="søker.selvstendigNæringsdrivendeInformasjon"
                        type={'test'}
                        legend={getMessage(intl, 'arbeidsforhold.selvstendig.erSelvstendigNæringsdrivende')}
                        buttonLabel={getMessage(intl, 'leggtil')}
                        formComponent={SelvstendigNæringsdrivende}
                    />
                </Block>
                <Block visible={visKomponent.harHattAnnenInntektSiste10Mnd}>
                    <Arbeidsforholdseksjon
                        name="søker.harHattAnnenInntektSiste10Mnd"
                        listName="søker.andreInntekterSiste10Mnd"
                        type={'test'}
                        legend={getMessage(intl, 'arbeidsforhold.andreInntekter')}
                        buttonLabel={getMessage(intl, 'leggtil')}
                        formComponent={AndreInntekter}
                    />
                </Block>
                <Block visible={visKomponent.ingenArbeidsforholdVeileder}>
                    <Veilederinfo type="advarsel">
                        <FormattedHTMLMessage id="arbeidsforhold.veileder.ingenArbeidsforhold" />
                    </Veilederinfo>
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const { søkerinfo } = state.api;

    return {
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : [],
    };
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => {
    return {
        uploadAttachment: (attachment: Attachment) =>
            dispatch({ type: AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST, payload: { attachment } }),
        deleteAttachment: (attachment: Attachment) =>
            dispatch({ type: AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST, payload: { attachment } }),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Arbeidsforhold)
);
