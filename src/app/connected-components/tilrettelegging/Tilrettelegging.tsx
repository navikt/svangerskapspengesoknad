import React, { FunctionComponent } from 'react';
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
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
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

    const { values } = formikProps;

    const index = values.tilrettelegging.findIndex((t) => t.id === id);
    const tilrettelegging = values.tilrettelegging[index];
    const arbeidsgiversNavn = finnArbeidsgiversNavn(id, arbeidsforhold);
    const attachments = vedlegg.filter((v: Attachment) => tilrettelegging.vedlegg.includes(v.id));

    // const visVedlegg =
    //     (tilrettelegging.type === Tilretteleggingstype.HEL && !!tilrettelegging.tilrettelagtArbeidFom) ||
    //     (tilrettelegging.type === Tilretteleggingstype.DELVIS && !!tilrettelegging.tilrettelagtArbeidFom) ||
    //     tilrettelegging.type === Tilretteleggingstype.INGEN;

    const visKomponent = {
        nesteknapp: true,
        vedlegg: true,
        visDel1: attachments.length > 0 || true,
        visDel2: !!tilrettelegging.behovForTilretteleggingFom,
    };
    //     typevelger: !!tilrettelegging.behovForTilretteleggingFom,
    //     helEllerDelvis: tilrettelegging.type !== undefined && tilrettelegging.type !== Tilretteleggingstype.INGEN,
    //     stillingsprosent: tilrettelegging.type === Tilretteleggingstype.DELVIS,
    //     fraHvilkenDato:
    //         (tilrettelegging.type === Tilretteleggingstype.DELVIS && !!tilrettelegging.stillingsprosent) ||
    //         tilrettelegging.type === Tilretteleggingstype.HEL,
    //     vedlegg: visVedlegg,
    // };

    const navigate = () => {
        const allSteps = getAllSteps(values.søknadsgrunnlag);
        const nextStep = getAdjacentSteps(step, allSteps)[1];
        const nextStepPath = getSøknadStepPath(nextStep.step, nextStep.subStep);
        navigateTo(nextStepPath, history);
    };

    return (
        <Applikasjonsside visTittel visSpråkvelger>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={visKomponent.nesteknapp}
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
                            title: getMessage(intl, 'tilrettelegging.vedlegg.label'),
                        }}>
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
                </Block>
                <Block visible={visKomponent.visDel1} margin="none">
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
                    <Block header={{ title: 'Del 1', stil: 'seksjon' }}>
                        <Block margin="xs">
                            <DatoInput
                                name={`tilrettelegging.${index}.behovForTilretteleggingFom`}
                                label={getMessage(intl, 'tilrettelegging.behovForTilretteleggingFom.label', {
                                    arbeidsgiversNavn,
                                })}
                            />
                        </Block>
                    </Block>
                </Block>
                <Block header={{ title: 'Del 2', stil: 'seksjon' }} visible={visKomponent.visDel2}>
                    <CheckboksPanelGruppe
                        label="Hvordan kan du jobbe mens du er gravid?"
                        name={`tilrettelegging.${index}.type`}
                        options={[
                            {
                                label: 'a) Du kan fortsette med samme stillingsprosent',
                                value: 'hel',
                            },
                            {
                                label: 'b) Du kan fortsette med redusert arbeidstid',
                                value: 'delvis',
                            },
                            {
                                label: 'c) Du må midlertidig gå ut av ditt arbeid',
                                value: 'ingen',
                            },
                        ]}
                    />
                </Block>

                {/* <Block visible={visKomponent.typevelger}>
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
                </Block> */}
                {/* <Block margin="xs" visible={visKomponent.stillingsprosent}>
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
                </Block> */}
                {/* <Block margin="s" visible={visKomponent.fraHvilkenDato}>
                    <DatoInput
                        name={`tilrettelegging.${index}.tilrettelagtArbeidFom`}
                        label={getMessage(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                        datoAvgrensinger={{
                            minDato: tilrettelegging.behovForTilretteleggingFom,
                            maksDato: values.barn.fødselsdato,
                        }}
                    />
                </Block> */}
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
