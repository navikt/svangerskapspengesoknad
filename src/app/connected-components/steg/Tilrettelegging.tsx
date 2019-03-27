import React, { FunctionComponent } from 'react';
import { FieldArray } from 'formik';
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from 'react-intl';

import { StepProps } from 'app/components/step/Step';
import { CustomFormikProps } from 'app/types/Formik';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { Tilretteleggingstype, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Block from 'common/components/block/Block';
import RadioPanelGruppe from 'app/formik/wrappers/RadioPanelGruppe';
import InputField from 'app/formik/wrappers/InputField';
// import { containsErrors } from 'app/utils/validering/validerSøknad';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { State } from 'app/redux/store';
import { FetchStatus } from 'app/types/FetchState';
import { connect } from 'react-redux';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { finnArbeidsgiversNavn, getSøknadStepPath } from 'app/utils/stepUtils';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import Action from 'app/redux/types/Action';
import { AttachmentActionTypes } from 'app/redux/types/AttachmentAction';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import FormikStep from 'app/components/formikStep/FormikStep';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import { navigateTo } from 'app/utils/navigationUtils';

interface OwnProps {
    step: SøknadStep;
    tilretteleggingId: string;
    tilretteleggingIndex: number;
    formikProps: CustomFormikProps;
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
    vedlegg: Attachment[];
    uploadAttachment: (attachment: Attachment, id: string) => void;
    deleteAttachment: (attachment: Attachment, id: string) => void;
}

type Props = OwnProps & StateProps & StepProps & InjectedIntlProps;

const Tilrettelegging: FunctionComponent<Props> = (props) => {
    const {
        step,
        formikProps,
        tilretteleggingId: id,
        tilretteleggingIndex: index,
        arbeidsforhold,
        vedlegg,
        uploadAttachment,
        deleteAttachment,
        intl,
        history,
    } = props;

    const { values /*errors*/ } = formikProps;

    const tilrettelegging = values.tilrettelegging[index];
    // const inneholderFeil = containsErrors(errors.tilrettelegging);
    const arbeidsgiversNavn = finnArbeidsgiversNavn(id, arbeidsforhold);
    const attachments = vedlegg.filter((v: Attachment) => tilrettelegging.vedlegg.includes(v.id));

    const visKomponent = {
        typevelger: !!tilrettelegging.behovForTilretteleggingFom,
        helEllerDelvis: tilrettelegging.type !== undefined && tilrettelegging.type !== Tilretteleggingstype.INGEN,
        stillingsprosent: tilrettelegging.type === Tilretteleggingstype.DELVIS,
        fraHvilkenDato:
            (tilrettelegging.type === Tilretteleggingstype.DELVIS && !!tilrettelegging.stillingsprosent) ||
            tilrettelegging.type === Tilretteleggingstype.HEL,
        vedlegg:
            (tilrettelegging.type === Tilretteleggingstype.HEL && !!tilrettelegging.tilrettelagtArbeidFom) ||
            (tilrettelegging.type === Tilretteleggingstype.DELVIS && !!tilrettelegging.tilrettelagtArbeidFom) ||
            tilrettelegging.type === Tilretteleggingstype.INGEN,
        nesteknapp: attachments.length > 0,
    };

    const navigate = () => {
        let nextStep, subStep;
        if (index === values.tilrettelegging.length - 1) {
            nextStep = StepID.UTENLANDSOPPHOLD;
        } else {
            nextStep = StepID.TILRETTELEGGING;
            subStep = values.søknadsgrunnlag[index + 1].id;
        }

        navigateTo(getSøknadStepPath(nextStep, subStep), history);
    };

    return (
        <Applikasjonsside visTittel visSpråkvelger>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={visKomponent.nesteknapp}
                onValidFormSubmit={navigate}
                history={history}>
                <Block visible={tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET}>
                    <Veilederinfo stil="kompakt" type="info">
                        <FormattedHTMLMessage
                            id="tilrettelegging.veileder.intro"
                            values={{
                                arbeidsgiversNavn,
                            }}
                        />
                    </Veilederinfo>
                </Block>
                <Block margin="xs">
                    <DatoInput
                        name={`tilrettelegging.${index}.behovForTilretteleggingFom`}
                        label={getMessage(intl, 'tilrettelegging.behovForTilretteleggingFom.label', {
                            arbeidsgiversNavn,
                        })}
                    />
                </Block>
                <Block visible={visKomponent.typevelger}>
                    <RadioPanelGruppe
                        id="tilrettelegging.noeEllerIngen"
                        name={`tilrettelegging.${index}.type`}
                        value={
                            tilrettelegging.type === Tilretteleggingstype.DELVIS ||
                            tilrettelegging.type === Tilretteleggingstype.HEL
                                ? Tilretteleggingstype.NOE
                                : undefined
                        }
                        legend={getMessage(intl, 'tilrettelegging.noeEllerIngen.label')}
                        radios={[
                            {
                                value: Tilretteleggingstype.NOE,
                                label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.NOE}`),
                            },
                            {
                                value: Tilretteleggingstype.INGEN,
                                label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.INGEN}`),
                            },
                        ]}
                    />
                </Block>
                <Block visible={visKomponent.helEllerDelvis}>
                    <RadioPanelGruppe
                        id="tilrettelegging.helEllerDelvis"
                        name={`tilrettelegging.${index}.type`}
                        legend={getMessage(intl, 'tilrettelegging.helEllerDelvis.label')}
                        radios={[
                            {
                                value: Tilretteleggingstype.HEL,
                                label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.HEL}`),
                            },
                            {
                                value: Tilretteleggingstype.DELVIS,
                                label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.DELVIS}`),
                            },
                        ]}
                    />
                </Block>
                <Block margin="xs" visible={visKomponent.stillingsprosent}>
                    {tilrettelegging.type === Tilretteleggingstype.DELVIS && (
                        <InputField
                            type="number"
                            bredde="XS"
                            max={100}
                            min={0}
                            step={10}
                            placeholder={getMessage(intl, 'tilrettelegging.stillingsprosent.placeholder')}
                            name={`tilrettelegging.${index}.stillingsprosent`}
                            label={getMessage(intl, 'tilrettelegging.stillingsprosent.label')}
                        />
                    )}
                </Block>
                <Block margin="s" visible={visKomponent.fraHvilkenDato}>
                    <DatoInput
                        name={`tilrettelegging.${index}.tilrettelagtArbeidFom`}
                        label={getMessage(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                        datoAvgrensinger={{
                            minDato: tilrettelegging.behovForTilretteleggingFom,
                            maksDato: values.barn.fødselsdato,
                        }}
                    />
                </Block>
                <Block
                    visible={visKomponent.vedlegg}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.vedlegg.label'),
                    }}>
                    <Block margin="xs">
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedHTMLMessage id="tilrettelegging.veileder.vedlegg" />
                        </Veilederinfo>
                    </Block>
                    <FieldArray
                        name={`tilrettelegging.${index}.vedlegg`}
                        render={({ form, push, remove }) => (
                            <AttachmentOverview
                                attachmentType={AttachmentType.TILRETTELEGGING}
                                skjemanummer={Skjemanummer.ANNET}
                                attachments={attachments}
                                onFilesSelect={(files: Attachment[]) => {
                                    files.forEach((file) => {
                                        push(file.id);
                                        uploadAttachment(file, id);
                                    });
                                }}
                                onFileDelete={(files: Attachment[]) => {
                                    files.forEach((file) => {
                                        remove(tilrettelegging.vedlegg.indexOf(file.id));
                                        deleteAttachment(file, id);
                                    });
                                }}
                            />
                        )}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const søkerinfo = state.api.søkerinfo;
    return {
        vedlegg: state.attachment.vedlegg.filter((v) => v.type === AttachmentType.TILRETTELEGGING),
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : undefined,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Tilrettelegging));
