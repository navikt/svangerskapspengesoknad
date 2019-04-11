import React, { FunctionComponent } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { FieldArray } from 'formik';
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from 'react-intl';

import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentActionTypes } from 'app/redux/types/AttachmentAction';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { CustomFormikProps } from 'app/types/Formik';
import { FetchStatus } from 'app/types/FetchState';
import { finnArbeidsgiversNavn, getSøknadStepPath, getAllSteps, getAdjacentSteps } from 'app/utils/stepUtils';
import { navigateTo } from 'app/utils/navigationUtils';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { State } from 'app/redux/store';
import { StepProps } from 'app/components/step/Step';
import { Arbeidsforholdstype, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import Action from 'app/redux/types/Action';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import SøknadStep from 'app/types/SøknadStep';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import CheckboksPanelGruppe from '../../formik/wrappers/CheckboksPanelGruppe';
import InfoBlock from 'common/components/info-block/InfoBlock';
import InputField from '../../formik/wrappers/InputField';

interface OwnProps {
    id: string;
    step: SøknadStep;
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
    const { id, step, formikProps, arbeidsforhold, vedlegg, uploadAttachment, deleteAttachment, intl, history } = props;

    const { values, setFieldValue } = formikProps;

    const index = values.tilrettelegging.findIndex((t) => t.id === id);
    const tilrettelegging = values.tilrettelegging[index];
    const arbeidsgiversNavn = finnArbeidsgiversNavn(id, arbeidsforhold);
    const attachments = vedlegg.filter((v: Attachment) => tilrettelegging.vedlegg.includes(v.id));

    const getInputName = (name: string) => `tilrettelegging.${index}.${name}`;
    const tilretteleggingstypeName = getInputName('type');
    const valgteTilretteleggingstyper = get(values, tilretteleggingstypeName) || [];

    const visKomponent = {
        vedlegg: true,
        visDel1: attachments.length > 0,
        visDel2: !!tilrettelegging.behovForTilretteleggingFom,
        ingenTilrettelegging: valgteTilretteleggingstyper.includes(Tilretteleggingstype.INGEN),
        delvisTilrettelegging: valgteTilretteleggingstyper.includes(Tilretteleggingstype.DELVIS),
        helTilrettelegging: valgteTilretteleggingstyper.includes(Tilretteleggingstype.HEL)
    };

    const { ingenTilrettelegging, delvisTilrettelegging, helTilrettelegging } = values.tilrettelegging[index];
    const visNesteKnapp = (): boolean => {
        return (
            visKomponent.visDel2 &&
            valgteTilretteleggingstyper.length > 0 &&
            (visKomponent.ingenTilrettelegging
                ? ingenTilrettelegging !== undefined && ingenTilrettelegging.slutteArbeidFom !== undefined
                : true) &&
            (visKomponent.delvisTilrettelegging
                ? delvisTilrettelegging !== undefined &&
                  !isNaN(delvisTilrettelegging.stillingsprosent) &&
                  delvisTilrettelegging.tilrettelagtArbeidFom !== undefined
                : true) &&
            (visKomponent.helTilrettelegging
                ? helTilrettelegging !== undefined && helTilrettelegging.tilrettelagtArbeidFom !== undefined
                : true)
        );
    };

    const cleanupTilrettelegging = () => {
        if (visKomponent.ingenTilrettelegging === false) {
            setFieldValue(getInputName('ingenTilrettelegging'), undefined);
        }
        if (visKomponent.delvisTilrettelegging === false) {
            setFieldValue(getInputName('delvisTilrettelegging'), undefined);
        }
        if (visKomponent.helTilrettelegging === false) {
            setFieldValue(getInputName('helTilrettelegging'), undefined);
        }
    };

    const navigate = () => {
        cleanupTilrettelegging();
        const allSteps = getAllSteps(values.søknadsgrunnlag);
        const nextStep = getAdjacentSteps(step, allSteps)[1];
        const nextStepPath = getSøknadStepPath(nextStep.step, nextStep.subStep);
        navigateTo(nextStepPath, history);
    };

    return (
        <Applikasjonsside visTittel={true} visSpråkvelger={true}>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={visNesteKnapp()}
                onValidFormSubmit={navigate}
                history={history}>
                <Block visible={visKomponent.vedlegg}>
                    <Block>
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedHTMLMessage id="tilrettelegging.veileder.vedlegg" />
                        </Veilederinfo>
                    </Block>
                    <Block
                        header={{
                            title: getMessage(intl, 'tilrettelegging.vedlegg.label')
                        }}>
                        <FieldArray
                            name={getInputName('vedlegg')}
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
                </Block>
                <Block visible={visKomponent.visDel1} margin="none">
                    <Block visible={tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET}>
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedHTMLMessage
                                id="tilrettelegging.veileder.intro"
                                values={{
                                    arbeidsgiversNavn
                                }}
                            />
                        </Veilederinfo>
                    </Block>
                    <Block header={{ title: 'Del 1', stil: 'seksjon' }}>
                        <Block margin="xs">
                            <DatoInput
                                name={getInputName('behovForTilretteleggingFom')}
                                label={getMessage(intl, 'tilrettelegging.behovForTilretteleggingFom.label', {
                                    arbeidsgiversNavn
                                })}
                            />
                        </Block>
                    </Block>
                </Block>
                <Block header={{ title: 'Del 2', stil: 'seksjon' }} visible={visKomponent.visDel2}>
                    <CheckboksPanelGruppe
                        label="Hvordan kan du jobbe mens du er gravid?"
                        name={tilretteleggingstypeName}
                        columns={1}
                        options={[
                            {
                                label: 'a) Du kan fortsette med samme stillingsprosent',
                                value: Tilretteleggingstype.INGEN
                            },
                            {
                                label: 'b) Du kan fortsette med redusert arbeidstid',
                                value: Tilretteleggingstype.DELVIS
                            },
                            {
                                label: 'c) Du må midlertidig gå ut av ditt arbeid',
                                value: Tilretteleggingstype.HEL
                            }
                        ]}
                    />
                </Block>

                <Block
                    visible={visKomponent.ingenTilrettelegging}
                    header={{ title: 'a) Du kan fortsette å jobbe med samme stillingsprosent' }}>
                    <InfoBlock>
                        <DatoInput
                            name={getInputName('ingenTilrettelegging.slutteArbeidFom')}
                            label={'Fra hvilken dato kan du fortsette med samme stillingsprosent?'}
                            datoAvgrensinger={{
                                minDato: tilrettelegging.behovForTilretteleggingFom,
                                maksDato: values.barn.fødselsdato
                            }}
                        />
                    </InfoBlock>
                </Block>
                <Block
                    visible={visKomponent.delvisTilrettelegging}
                    header={{
                        title: 'b) Du kan fortsette med redusert arbeidstid'
                    }}>
                    <InfoBlock>
                        <Block margin="s">
                            <InputField
                                type="number"
                                bredde="XS"
                                max={100}
                                min={0}
                                step={1}
                                placeholder={getMessage(intl, 'tilrettelegging.stillingsprosent.placeholder')}
                                name={getInputName('delvisTilrettelegging.stillingsprosent')}
                                label={getMessage(intl, 'tilrettelegging.stillingsprosent.label')}
                            />
                        </Block>
                        <DatoInput
                            name={getInputName('delvisTilrettelegging.tilrettelagtArbeidFom')}
                            label={'Fra hvilken dato kan du jobbe redusert?'}
                            datoAvgrensinger={{
                                minDato: tilrettelegging.behovForTilretteleggingFom,
                                maksDato: values.barn.fødselsdato
                            }}
                        />
                    </InfoBlock>
                </Block>
                <Block
                    visible={visKomponent.helTilrettelegging}
                    header={{
                        title: 'c) Du må midlertidlig gå ut av ditt arbeid'
                    }}>
                    <InfoBlock>
                        <DatoInput
                            name={getInputName('helTilrettelegging.tilrettelagtArbeidFom')}
                            label={'Fra hvilken dato må du gå midlertidig ut av ditt arbeid?'}
                            datoAvgrensinger={{
                                minDato: tilrettelegging.behovForTilretteleggingFom,
                                maksDato: values.barn.fødselsdato
                            }}
                        />
                    </InfoBlock>
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const søkerinfo = state.api.søkerinfo;
    return {
        vedlegg: state.attachment.vedlegg.filter((v) => v.type === AttachmentType.TILRETTELEGGING),
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : undefined
    };
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => {
    return {
        uploadAttachment: (attachment: Attachment) =>
            dispatch({ type: AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST, payload: { attachment } }),
        deleteAttachment: (attachment: Attachment) =>
            dispatch({ type: AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST, payload: { attachment } })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Tilrettelegging));
