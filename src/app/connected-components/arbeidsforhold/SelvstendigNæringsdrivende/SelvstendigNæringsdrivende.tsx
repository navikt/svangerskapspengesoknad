import React, { FunctionComponent, useMemo } from 'react';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';

import BEMHelper from 'app/utils/bem';
import { Næringstype, Næring } from 'app/types/SelvstendigNæringsdrivende';
import getMessage from 'common/util/i18nUtils';
import CheckboksPanelGruppe from 'app/formik/wrappers/CheckboksPanelGruppe';
import Block from 'common/components/block/Block';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import { SelectChangeEvent } from 'app/types/events';
import getCountries from 'app/utils/getCountries';
import DatoInput from 'app/formik/wrappers/DatoInput';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { isValid } from 'i18n-iso-countries';
import { Undertittel } from 'nav-frontend-typografi';
import { normaliserNæring } from '../utils/normaliser';
import _ from 'lodash';
import VarigEndringAvNæringsinntekt from './VarigEndringAvNæringsinntekt';
import moment from 'moment';
import Næringsrelasjon from './Næringsrelasjon';
import { ModalFormProps } from '../ArbeidSeksjon/ArbeidSeksjon';

const cls = BEMHelper('selvstendig-næringsdrivende');

type Props = ModalFormProps<Næring> & InjectedIntlProps;
const SelvstendigNæringsdrivende: FunctionComponent<Props> = (props: Props) => {
    const { endre, onCancel, element = { næringstyper: [] }, onAdd, intl } = props;

    const countries = useMemo(() => getCountries(true, true, intl), [intl]);

    return (
        <Formik
            initialValues={element}
            // tslint:disable-next-line: no-empty
            validate={() => {}} // TODO
            onSubmit={onAdd}
            render={({ handleSubmit, values }: FormikProps<Næring>) => {
                const normalisertNæring = normaliserNæring(values);

                const {
                    næringstyper,
                    navnPåNæringen,
                    registrertINorge,
                    organisasjonsnummer,
                    registrertILand,
                    tidsperiode = {},
                    næringsinntekt,
                    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
                    oppstartsdato,
                    harRegnskapsfører,
                    revisor,
                    harRevisor,
                    endringAvNæringsinntektInformasjon,
                } = normalisertNæring;

                const visKomponent = {
                    navnPåNæringen: næringstyper !== undefined && næringstyper.length > 0,
                    advarselFisker:
                        næringstyper !== undefined &&
                        navnPåNæringen !== undefined &&
                        navnPåNæringen !== '' &&
                        næringstyper.includes(Næringstype.FISKER),
                    registrertINorge: navnPåNæringen !== undefined && navnPåNæringen !== '',
                    land: registrertINorge === false,
                    orgNr: registrertINorge === true,
                    tidsperiode:
                        (registrertINorge === true && organisasjonsnummer !== undefined) ||
                        registrertILand !== undefined,
                    varigEndringAvNæringsinntektBolk:
                        tidsperiode !== undefined &&
                        tidsperiode.fom !== undefined &&
                        moment(tidsperiode.fom as Date).isBefore(moment().subtract(4, 'year')),
                    ...(moment(tidsperiode.fom as Date).isSameOrAfter(moment().subtract(4, 'year')) && {
                        næringsinntekt: tidsperiode.fom !== undefined,
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: næringsinntekt !== undefined,
                        oppstartsdato: harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === true,
                    }),
                    harRegnskapsfører:
                        (oppstartsdato !== undefined && oppstartsdato !== '') ||
                        (endringAvNæringsinntektInformasjon !== undefined &&
                            endringAvNæringsinntektInformasjon.forklaring !== undefined &&
                            endringAvNæringsinntektInformasjon.forklaring !== ''),
                    næringsRelasjonRegnskapsfører: normalisertNæring.harRegnskapsfører === true,
                    harRevisor:
                        harRegnskapsfører === false ||
                        (revisor !== undefined && revisor.erNærVennEllerFamilie !== undefined),
                    næringsrelasjonRevisor: harRevisor === true,
                    kanInnhenteOpplsyningerFraRevisor:
                        revisor !== undefined && revisor.erNærVennEllerFamilie !== undefined,
                    bliKontaktet: false,
                } as any;

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
                                {getMessage(intl, `arbeidsforhold.selvstendig.tittel${endre ? '.endre' : ''}`)}
                            </Undertittel>
                        </Block>

                        <Block>
                            <CheckboksPanelGruppe
                                name="næringstyper"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.næringstype')}
                                options={Object.values(Næringstype).map((næringstype: Næringstype) => ({
                                    label: getMessage(intl, `næringstype.${næringstype.toLocaleLowerCase()}`),
                                    value: næringstype,
                                }))}
                            />
                        </Block>

                        <Block visible={visKomponent.navnPåNæringen}>
                            <InputField
                                name="navnPåNæringen"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.navn')}
                                required={true}
                            />
                        </Block>

                        <Block visible={visKomponent.advarselFisker}>
                            <Veilederinfo type="advarsel">
                                <FormattedHTMLMessage
                                    id="arbeidsforhold.selvstendig.fisker"
                                    values={{ navnPåNæringen: values.navnPåNæringen }}
                                />
                            </Veilederinfo>
                        </Block>

                        <Block visible={visKomponent.registrertINorge}>
                            <JaNeiSpørsmål
                                name="registrertINorge"
                                legend={getMessage(intl, 'arbeidsforhold.selvstendig.registrertINorge', {
                                    navn: values.navnPåNæringen,
                                })}
                            />
                        </Block>

                        <Block margin="xs" visible={visKomponent.land}>
                            <Field
                                name="registrertILand"
                                render={({ field, form }: FieldProps<string>) => (
                                    <NavSelect
                                        label={getMessage(intl, 'arbeidsforhold.seslvstendig.registrertILand')}
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

                        <Block visible={visKomponent.orgNr}>
                            <InputField
                                name="organisasjonsnummer"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.organisasjonsnummer')}
                                required={true}
                            />
                        </Block>

                        <Block visible={visKomponent.tidsperiode}>
                            <>
                                <DatoInput
                                    fullskjermKalender
                                    name="tidsperiode.fom"
                                    label={getMessage(intl, 'arbeidsforhold.selvstendig.fom', {
                                        navn: values.navnPåNæringen,
                                    })}
                                />
                                <DatoInput
                                    fullskjermKalender
                                    name="tidsperiode.tom"
                                    label={getMessage(intl, 'arbeidsforhold.selvstendig.tom', {
                                        navn: values.navnPåNæringen,
                                    })}
                                />
                            </>
                        </Block>

                        <Block visible={visKomponent.varigEndringAvNæringsinntektBolk}>
                            <VarigEndringAvNæringsinntekt values={values} />
                        </Block>

                        <Block visible={visKomponent.næringsinntekt === true}>
                            <InputField
                                name="næringsinntekt"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.næringsinntekt')}
                                required={true}
                            />
                        </Block>

                        <Block visible={visKomponent.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === true}>
                            <JaNeiSpørsmål
                                name="harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene"
                                legend={getMessage(
                                    intl,
                                    'arbeidsforhold.selvstendig.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene'
                                )}
                            />
                        </Block>

                        <Block visible={visKomponent.oppstartsdato === true}>
                            <DatoInput
                                fullskjermKalender
                                name="oppstartsdato"
                                label={getMessage(intl, 'arbeidsforhold.selvstendig.oppstartsdato')}
                            />
                        </Block>

                        <Block visible={visKomponent.harRegnskapsfører}>
                            <JaNeiSpørsmål
                                name="harRegnskapsfører"
                                legend={getMessage(intl, 'arbeidsforhold.selvstendig.harRegnskapsfører')}
                            />
                        </Block>

                        <Block visible={visKomponent.næringsRelasjonRegnskapsfører}>
                            <Næringsrelasjon type="regnskapsfører" />
                        </Block>

                        <Block visible={visKomponent.harRevisor}>
                            <JaNeiSpørsmål
                                name="harRevisor"
                                legend={getMessage(intl, 'arbeidsforhold.selvstendig.harRevisor')}
                            />
                        </Block>

                        <Block visible={visKomponent.næringsrelasjonRevisor}>
                            <Næringsrelasjon type="revisor" />
                        </Block>

                        <Block visible={visKomponent.kanInnhenteOpplsyningerFraRevisor}>
                            <JaNeiSpørsmål
                                name="kanInnhenteOpplsyningerFraRevisor"
                                legend={getMessage(
                                    intl,
                                    'arbeidsforhold.selvstendig.kanInnhenteOpplsyningerFraRevisor'
                                )}
                            />
                        </Block>

                        <Block visible={visKomponent.bliKontaktet}>
                            <Veilederinfo type="advarsel">
                                <FormattedHTMLMessage id="arbeidsforhold.selvstendig.bliKontaktet" />
                            </Veilederinfo>
                        </Block>

                        <Knapp htmlType="button" onClick={onCancel}>
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp disabled={!isValid} htmlType="submit">
                            <FormattedMessage id={endre ? 'endre' : 'leggTil'} />
                        </Hovedknapp>
                    </form>
                );
            }}
        />
    );
};

export default injectIntl(SelvstendigNæringsdrivende);
