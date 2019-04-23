import React, { FunctionComponent, useMemo } from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Formik, FormikProps, FieldArray } from 'formik';
import { connect } from 'react-redux';

import BEMHelper from 'common/util/bem';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { isValid } from 'i18n-iso-countries';
import RadioPanelGruppe from 'app/formik/wrappers/RadioPanelGruppe';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import getCountries from 'app/utils/getCountries';
import InputField from 'app/formik/wrappers/InputField';
import { AnnenInntektType, AnnenInntekt } from 'app/types/AnnenInntekt';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Undertittel } from 'nav-frontend-typografi';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { ModalFormProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { AttachmentActionTypes } from 'app/redux/types/AttachmentAction';
import Action from 'app/redux/types/Action';
import { State } from 'app/redux/store';
import validateAndreInntekter from 'app/utils/validation/validateAndreInntekter';
import DatoInput from 'app/formik/wrappers/DatoInput';
import Select from 'app/formik/wrappers/Select';
import DatoerInputLayout from 'common/components/layout/datoerInputLayout/DatoerInputLayout';
import Knapperad from 'common/components/knapperad/Knapperad';

const cls = BEMHelper('andre-inntekter');

interface ConnectProps {
    vedlegg: Attachment[];
    uploadAttachment: (attachment: Attachment) => void;
    deleteAttachment: (attachment: Attachment) => void;
}

type Props = ConnectProps & ModalFormProps<AnnenInntekt> & InjectedIntlProps;
const AndreInntekter: FunctionComponent<Props> = (props) => {
    const {
        endre,
        onCancel,
        element = {
            vedlegg: [] as Attachment[]
        },
        onAdd,
        intl,
        uploadAttachment,
        deleteAttachment,
        vedlegg
    } = props;

    const countries = useMemo(() => getCountries(true, false, intl), [intl]);

    return (
        <Formik
            initialValues={element}
            validate={validateAndreInntekter()}
            onSubmit={onAdd}
            render={({ values, handleSubmit, errors }: FormikProps<AnnenInntekt>) => {
                const visKomponent = {
                    navn: values.type === AnnenInntektType.JOBB_I_UTLANDET,
                    land: values.type === AnnenInntektType.JOBB_I_UTLANDET,
                    advarselDokumentasjon: values.type !== AnnenInntektType.JOBB_I_UTLANDET,
                    vedlegg: values.type !== AnnenInntektType.JOBB_I_UTLANDET
                };

                return (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className={cls.block}>
                        <Block>
                            <Undertittel>
                                <FormattedMessage id={`arbeidsforhold.andreInntekter.tittel${endre ? '.endre' : ''}`} />
                            </Undertittel>
                        </Block>

                        <Block>
                            <RadioPanelGruppe
                                twoColumns={true}
                                name={'type'}
                                legend={getMessage(intl, 'arbeidsforhold.andreInntekter.inntektstype')}
                                radios={[
                                    {
                                        value: AnnenInntektType.JOBB_I_UTLANDET,
                                        label: getMessage(intl, 'inntektstype.jobb_i_utlandet')
                                    },
                                    {
                                        value: AnnenInntektType.MILITÆRTJENESTE,
                                        label: getMessage(intl, 'inntektstype.militær_eller_siviltjeneste')
                                    }
                                ]}
                            />
                        </Block>

                        <Block visible={visKomponent.land}>
                            <Select name="land" label={getMessage(intl, 'arbeidsforhold.andreInntekter.land')}>
                                <option value="" />
                                {countries.map((countryOption: string[]) => {
                                    const [countryCode, countryName] = countryOption;
                                    return (
                                        <option key={countryCode} value={countryCode}>
                                            {countryName}
                                        </option>
                                    );
                                })}
                            </Select>
                        </Block>

                        <Block visible={visKomponent.navn}>
                            <InputField
                                name="arbeidsgiverNavn"
                                label={getMessage(intl, 'arbeidsforhold.andreInntekter.arbeidsgiverNavn')}
                            />
                        </Block>

                        <Block>
                            <DatoerInputLayout
                                fra={
                                    <DatoInput
                                        fullskjermKalender={true}
                                        name="tidsperiode.fom"
                                        label={getMessage(intl, 'fraOgMed')}
                                    />
                                }
                                til={
                                    <DatoInput
                                        fullskjermKalender={true}
                                        name="tidsperiode.tom"
                                        label={getMessage(intl, 'tilOgMed')}
                                    />
                                }
                            />
                        </Block>

                        <Block margin="none" visible={visKomponent.advarselDokumentasjon}>
                            <Veilederinfo type="info">
                                <FormattedMessage id="arbeidsforhold.andreInntekter.militær_eller_siviltjeneste_info" />
                            </Veilederinfo>
                        </Block>

                        <Block visible={visKomponent.vedlegg}>
                            <FieldArray
                                name={'vedlegg'}
                                render={({ form, push, remove }) => {
                                    return (
                                        <AttachmentOverview
                                            attachmentType={AttachmentType.ANNEN_INNTEKT}
                                            skjemanummer={Skjemanummer.ANNET}
                                            attachments={vedlegg.filter((v) => form.values.vedlegg.includes(v.id))}
                                            onFilesSelect={(files: Attachment[]) => {
                                                files.forEach((file) => {
                                                    push(file.id);
                                                    uploadAttachment(file);
                                                });
                                            }}
                                            onFileDelete={(files: Attachment[]) => {
                                                files.forEach((file: Attachment) => {
                                                    remove(form.values.vedlegg.indexOf(file.id));
                                                    deleteAttachment(file);
                                                });
                                            }}
                                        />
                                    );
                                }}
                            />
                        </Block>

                        <Knapperad align="center" stil="mobile-50-50">
                            <Knapp htmlType="button" onClick={onCancel}>
                                <FormattedMessage id="avbryt" />
                            </Knapp>
                            <Hovedknapp disabled={!isValid} htmlType="submit">
                                <FormattedMessage id={endre ? 'endre' : 'leggtil'} />
                            </Hovedknapp>
                        </Knapperad>
                    </form>
                );
            }}
        />
    );
};

const mapStateToProps = (state: State) => {
    return {
        vedlegg: state.attachment.vedlegg.filter((v) => v.type === AttachmentType.ANNEN_INNTEKT)
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
)(injectIntl(AndreInntekter));
