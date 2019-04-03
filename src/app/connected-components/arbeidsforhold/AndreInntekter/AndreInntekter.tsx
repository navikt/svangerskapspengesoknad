import React, { FunctionComponent, useMemo } from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Formik, FormikProps, Field, FieldProps, FieldArray } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';

import BEMHelper from 'app/utils/bem';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { isValid } from 'i18n-iso-countries';
import RadioPanelGruppe from 'app/formik/wrappers/RadioPanelGruppe';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { SelectChangeEvent } from 'app/types/events';
import getCountries from 'app/utils/getCountries';
import InputField from 'app/formik/wrappers/InputField';
import { AnnenInntektType, AnnenInntekt } from 'app/types/AnnenInntekt';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Undertittel } from 'nav-frontend-typografi';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import DatoInput from 'app/formik/wrappers/DatoInput';

const cls = BEMHelper('andre-inntekter');

export interface ModalFormProps {
    endre: boolean;
    element?: any;
    type: Oppholdstype;
    onAdd: (opphold: AnnenInntekt) => void;
    onCancel: () => void;
}

type Props = ModalFormProps & InjectedIntlProps;
const AndreInntekter: FunctionComponent<Props> = (props: Props) => {
    const {
        endre,
        onCancel,
        element = {
            vedlegg: [],
        },
        onAdd,
        intl,
    } = props;

    const countries = useMemo(() => getCountries(true, false, intl), [intl]);

    return (
        <Formik
            initialValues={element}
            validate={() => {}}
            onSubmit={onAdd}
            render={({ handleSubmit }: FormikProps<Utenlandsopphold>) => {
                const visKomponent = {
                    navn: false,
                    land: false,
                    advarselDokumentasjon: false,
                    vedlegg: true,
                };

                return (
                    <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
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
                                name={'næringstyper'}
                                legend={getMessage(intl, 'arbeidsforhold.andreInntekter.inntektstype')}
                                radios={[
                                    {
                                        value: AnnenInntektType.JOBB_I_UTLANDET,
                                        label: getMessage(intl, 'inntektstype.jobb_i_utlandet'),
                                    },
                                    {
                                        value: AnnenInntektType.MILITÆRTJENESTE,
                                        label: getMessage(intl, 'inntektstype.militær_eller_siviltjeneste'),
                                    },
                                ]}
                            />
                        </Block>

                        <Block visible={visKomponent.land} margin="xs">
                            <Field
                                name="land"
                                render={({ field, form }: FieldProps<string>) => (
                                    <NavSelect
                                        label={getMessage(intl, 'arbeidsforhold.andreInntekter.land')}
                                        value={field.value}
                                        onChange={(e: SelectChangeEvent) => {
                                            form.setFieldValue(field.name, e.target.value);
                                        }}>
                                        <option value="" />
                                        {countries.map((countryOption: string[]) => {
                                            const [countryCode, countryName] = countryOption;
                                            return (
                                                <option key={countryCode} value={countryCode}>
                                                    {countryName}
                                                </option>
                                            );
                                        })}
                                    </NavSelect>
                                )}
                            />
                        </Block>

                        <Block visible={visKomponent.navn}>
                            <InputField
                                name="arbeidsgiverNavn"
                                label={getMessage(intl, 'annenInntekt.spørsmål.arbeidsgiver')}
                            />
                        </Block>

                        <Block margin="xxs">
                            <>
                                <DatoInput
                                    fullskjermKalender
                                    name="periode.fom"
                                    label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                />
                                <DatoInput
                                    fullskjermKalender
                                    name="periode.tom"
                                    label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                />
                            </>
                        </Block>

                        <Block visible={visKomponent.advarselDokumentasjon}>
                            <Veilederinfo type="info">
                                <FormattedMessage id="arbeidsforhold.andreInntekter.militær_eller_siviltjeneste_info" />
                            </Veilederinfo>
                        </Block>

                        <Block visible={visKomponent.vedlegg}>
                            <FieldArray
                                name={`andreInntekter.vedlegg`}
                                render={({ form, push, remove }) => (
                                    <AttachmentOverview
                                        attachmentType={AttachmentType.TILRETTELEGGING}
                                        skjemanummer={Skjemanummer.ANNET}
                                        attachments={element.vedlegg}
                                        onFilesSelect={(files: Attachment[]) => {
                                            files.forEach((file) => {
                                                push(file.id);
                                            });
                                        }}
                                        onFileDelete={(files: Attachment[]) => {
                                            files.forEach((file) => {
                                                remove(element.vedlegg.indexOf(file.id));
                                            });
                                        }}
                                    />
                                )}
                            />
                        </Block>

                        <Knapp htmlType="button" onClick={onCancel}>
                            <FormattedMessage id="utenlandsopphold.land.avbryt" />
                        </Knapp>
                        <Hovedknapp disabled={!isValid} htmlType="submit">
                            <FormattedMessage
                                id={endre ? 'utenlandsopphold.land.endre' : 'utenlandsopphold.land.leggTil'}
                            />
                        </Hovedknapp>
                    </form>
                );
            }}
        />
    );
};

export default injectIntl(AndreInntekter);
