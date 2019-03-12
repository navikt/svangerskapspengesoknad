import React, { FunctionComponent } from 'react';
import { connect as formConnect } from 'formik';
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from 'react-intl';

import Steg, { StegProps } from 'app/components/steg/Steg';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { Tilretteleggingstype, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Block from 'common/components/block/Block';
import RadioPanelGruppe from 'app/formik/wrappers/RadioPanelGruppe';
import InputField from 'app/formik/wrappers/InputField';
import { containsErrors } from 'app/utils/validering/validerSøknad';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { State } from 'app/redux/store';
import { FetchStatus } from 'app/types/FetchState';
import { connect } from 'react-redux';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { finnArbeidsgiversNavn } from 'app/utils/stepUtils';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';

interface OwnProps {
    tilretteleggingId: string;
    tilretteleggingIndex: number;
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
}

type OuterProps = OwnProps & StateProps & StegProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Tilrettelegging: FunctionComponent<Props> = (props) => {
    const { formik, tilretteleggingId: id, tilretteleggingIndex: index, arbeidsforhold, intl, ...stegProps } = props;
    const tilrettelegging = formik.values.tilrettelegging[index];
    const visTypevelger = tilrettelegging.behovForTilretteleggingFom !== undefined;
    const visStillingsprosent = tilrettelegging.type === Tilretteleggingstype.DELVIS;

    let visFørsteDag = false;
    if (
        (tilrettelegging.type === Tilretteleggingstype.DELVIS && tilrettelegging.stillingsprosent !== undefined) ||
        (tilrettelegging.type === Tilretteleggingstype.DELVIS || tilrettelegging.type === Tilretteleggingstype.HEL)
    ) {
        visFørsteDag = true;
    }

    const visNesteknapp =
        tilrettelegging.type === Tilretteleggingstype.INGEN || tilrettelegging.tilrettelagtArbeidFom !== undefined;

    const visVedlegg =
        tilrettelegging.type === Tilretteleggingstype.INGEN || tilrettelegging.tilrettelagtArbeidFom !== undefined;

    const inneholderFeil = containsErrors(formik.errors.tilrettelegging);
    const arbeidsgiversNavn = finnArbeidsgiversNavn(id, arbeidsforhold);

    return (
        <Steg
            {...stegProps}
            disableNesteknapp={inneholderFeil}
            renderNesteknapp={props.renderNesteknapp && visNesteknapp}>
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
            <Block visible={visTypevelger}>
                <RadioPanelGruppe
                    name={`tilrettelegging.${index}.type`}
                    legend={getMessage(intl, 'tilrettelegging.type.label')}
                    radios={[
                        {
                            value: Tilretteleggingstype.INGEN,
                            label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.INGEN}`),
                        },
                        {
                            value: Tilretteleggingstype.DELVIS,
                            label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.DELVIS}`),
                        },
                        {
                            value: Tilretteleggingstype.HEL,
                            label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.HEL}`),
                        },
                    ]}
                />
            </Block>
            <Block margin="xs" visible={visStillingsprosent}>
                {tilrettelegging.type === Tilretteleggingstype.DELVIS && (
                    <InputField
                        type="number"
                        bredde="M"
                        max={100}
                        min={0}
                        step={10}
                        placeholder="50"
                        name={`tilrettelegging.${index}.stillingsprosent`}
                        label={getMessage(intl, 'tilrettelegging.stillingsprosent.label')}
                    />
                )}
            </Block>
            <Block visible={visFørsteDag}>
                <DatoInput
                    name={`tilrettelegging.${index}.tilrettelagtArbeidFom`}
                    label={getMessage(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                    datoAvgrensinger={{
                        minDato: tilrettelegging.behovForTilretteleggingFom,
                        maksDato: formik.values.barn.fødselsdato,
                    }}
                />
            </Block>
            <Block visible={visVedlegg}>
                <AttachmentOverview
                    attachmentType={AttachmentType.TILRETTELEGGING}
                    skjemanummer={Skjemanummer.ANNET}
                    attachments={formik.values.vedlegg.filter((v) => tilrettelegging.vedlegg.some((tv) => tv === v.id))}
                    onFilesSelect={() => {
                        console.log('Beep, boop!');
                    }}
                    onFileDelete={() => {
                        console.log('Boooop');
                    }}
                />
            </Block>
        </Steg>
    );
};

const mapStateToProps = (state: State) => {
    const søkerinfo = state.api.søkerinfo;
    return { arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : undefined };
};

export default connect(mapStateToProps)(injectIntl(formConnect<OuterProps, UferdigSøknad>(Tilrettelegging)));
