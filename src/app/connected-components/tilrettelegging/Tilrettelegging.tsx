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
import { finnArbeidsforholdNavn, getSøknadStepPath, getAllSteps, getAdjacentSteps } from 'app/utils/stepUtils';
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
import Textarea from '../../formik/wrappers/Textarea';
import LabelMedInfobox from 'common/components/label-med-infobox/LabelMedInfobox';

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
    const arbeidsgiversNavn = finnArbeidsforholdNavn(id, arbeidsforhold, intl);
    const attachments = vedlegg.filter((v: Attachment) => tilrettelegging.vedlegg.includes(v.id));

    const erFrilans = tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER;
    const erSelvstendig = tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG;
    const erFrilansEllerSelvstendig = erFrilans || erSelvstendig;

    const getInputName = (name: string) => `tilrettelegging.${index}.${name}`;
    const tilretteleggingstypeName = getInputName('type');
    const valgteTilretteleggingstyper = get(values, tilretteleggingstypeName) || [];
    const { ingenTilrettelegging, delvisTilrettelegging, helTilrettelegging } = values.tilrettelegging[index];

    const frilansRisikoErOk = erFrilansEllerSelvstendig
        ? tilrettelegging.risikoFaktorer !== undefined && tilrettelegging.risikoFaktorer.length > 3
        : true;
    const visFrilansEllerSelvstendig = erFrilansEllerSelvstendig;
    const visVedlegg = visFrilansEllerSelvstendig ? frilansRisikoErOk : true;
    const visDel1 = frilansRisikoErOk && attachments.length > 0;
    const visDel2 = visDel1 === true && !!tilrettelegging.behovForTilretteleggingFom;
    const visIngenTilrettelegging = visDel2 && valgteTilretteleggingstyper.includes(Tilretteleggingstype.INGEN);
    const visDelvisTilrettelegging = visDel2 && valgteTilretteleggingstyper.includes(Tilretteleggingstype.DELVIS);
    const visHelTilrettelegging = visDel2 && valgteTilretteleggingstyper.includes(Tilretteleggingstype.HEL);
    const del1OgDel2ErOk =
        visDel2 &&
        valgteTilretteleggingstyper.length > 0 &&
        (visIngenTilrettelegging
            ? ingenTilrettelegging !== undefined && ingenTilrettelegging.slutteArbeidFom !== undefined
            : true) &&
        (visDelvisTilrettelegging
            ? delvisTilrettelegging !== undefined &&
              !isNaN(delvisTilrettelegging.stillingsprosent) &&
              delvisTilrettelegging.tilrettelagtArbeidFom !== undefined
            : true) &&
        (visHelTilrettelegging
            ? helTilrettelegging !== undefined && helTilrettelegging.tilrettelagtArbeidFom !== undefined
            : true);
    const visTiltakForTilrettelegging = del1OgDel2ErOk && visFrilansEllerSelvstendig;
    const tilretteleggingstiltakErOk = erFrilansEllerSelvstendig
        ? tilrettelegging.tilretteleggingstiltak !== undefined && tilrettelegging.tilretteleggingstiltak.length > 3
        : true;

    const visNesteKnapp = del1OgDel2ErOk && tilretteleggingstiltakErOk;

    const cleanupTilrettelegging = () => {
        if (visIngenTilrettelegging === false) {
            setFieldValue(getInputName('ingenTilrettelegging'), undefined);
        }
        if (visDelvisTilrettelegging === false) {
            setFieldValue(getInputName('delvisTilrettelegging'), undefined);
        }
        if (visHelTilrettelegging === false) {
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
                showNesteknapp={visNesteKnapp}
                onValidFormSubmit={navigate}
                history={history}>
                <Block visible={visFrilansEllerSelvstendig}>
                    <Block margin="xs">
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedHTMLMessage id="tilrettelegging.veileder.frilans.html" />
                        </Veilederinfo>
                    </Block>
                    <Textarea
                        name={getInputName('risikoFaktorer')}
                        label={
                            visFrilansEllerSelvstendig
                                ? getMessage(intl, 'tilrettelegging.frilans.risikoFaktorer.frilansSN')
                                : getMessage(intl, 'tilrettelegging.frilans.risikoFaktorer')
                        }
                    />
                </Block>
                <Block visible={visVedlegg}>
                    <Block>
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedHTMLMessage
                                id={
                                    visFrilansEllerSelvstendig
                                        ? 'tilrettelegging.veileder.vedlegg.frilansSN'
                                        : 'tilrettelegging.veileder.vedlegg'
                                }
                            />
                        </Veilederinfo>
                    </Block>
                    <Block
                        header={{
                            title: visFrilansEllerSelvstendig
                                ? getMessage(intl, 'tilrettelegging.vedlegg.label.frilansSN')
                                : getMessage(intl, 'tilrettelegging.vedlegg.label')
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
                <Block visible={visDel1} margin="none">
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
                    <Block header={{ title: getMessage(intl, 'tilrettelegging.del1'), stil: 'seksjon' }}>
                        <Block margin="xs">
                            <DatoInput
                                name={getInputName('behovForTilretteleggingFom')}
                                label={
                                    visFrilansEllerSelvstendig ? (
                                        <LabelMedInfobox
                                            title={getMessage(
                                                intl,
                                                'tilrettelegging.behovForTilretteleggingFom.label.frilansSN'
                                            )}
                                            info={getMessage(
                                                intl,
                                                'tilrettelegging.behovForTilretteleggingFom.infoBox.frilansSN'
                                            )}
                                        />
                                    ) : (
                                        <LabelMedInfobox
                                            title={getMessage(intl, 'tilrettelegging.behovForTilretteleggingFom.label')}
                                            info={getMessage(
                                                intl,
                                                'tilrettelegging.behovForTilretteleggingFom.infoBox'
                                            )}
                                        />
                                    )
                                }
                            />
                        </Block>
                    </Block>
                </Block>
                <Block header={{ title: getMessage(intl, 'tilrettelegging.del2'), stil: 'seksjon' }} visible={visDel2}>
                    <CheckboksPanelGruppe
                        label={
                            visFrilansEllerSelvstendig ? (
                                <LabelMedInfobox
                                    title={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.frilansSN')}
                                    info={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.frilansSN.infoBox')}
                                />
                            ) : (
                                <LabelMedInfobox
                                    title={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe')}
                                    info={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.infoBox')}
                                />
                            )
                        }
                        name={tilretteleggingstypeName}
                        columns={1}
                        options={[
                            {
                                label: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt'),
                                value: Tilretteleggingstype.HEL
                            },
                            {
                                label: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis'),
                                value: Tilretteleggingstype.DELVIS
                            },
                            {
                                label: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting'),
                                value: Tilretteleggingstype.INGEN
                            }
                        ]}
                    />
                </Block>
                <Block
                    visible={visHelTilrettelegging}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt'),
                        info: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt')
                    }}>
                    <InfoBlock>
                        <DatoInput
                            name={getInputName('helTilrettelegging.tilrettelagtArbeidFom')}
                            label={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt.spørsmål')}
                            datoAvgrensinger={{
                                minDato: tilrettelegging.behovForTilretteleggingFom,
                                maksDato: values.barn.fødselsdato
                            }}
                        />
                    </InfoBlock>
                </Block>
                <Block
                    visible={visDelvisTilrettelegging}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis'),
                        info: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis.infoBox')
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
                            label={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis.spørsmål')}
                            datoAvgrensinger={{
                                minDato: tilrettelegging.behovForTilretteleggingFom,
                                maksDato: values.barn.fødselsdato
                            }}
                        />
                    </InfoBlock>
                </Block>
                <Block
                    visible={visIngenTilrettelegging}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting'),
                        info: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting.infoBox')
                    }}>
                    <InfoBlock>
                        <DatoInput
                            name={getInputName('ingenTilrettelegging.slutteArbeidFom')}
                            label={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting.spørsmål')}
                            datoAvgrensinger={{
                                minDato: tilrettelegging.behovForTilretteleggingFom,
                                maksDato: values.barn.fødselsdato
                            }}
                        />
                    </InfoBlock>
                </Block>
                <Block visible={visTiltakForTilrettelegging}>
                    <Textarea
                        name={getInputName('tilretteleggingstiltak')}
                        label={getMessage(intl, 'tilrettelegging.tiltak')}
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
