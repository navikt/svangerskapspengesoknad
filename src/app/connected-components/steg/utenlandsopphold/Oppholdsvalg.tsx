import React, { FunctionComponent, useMemo } from 'react';
import { Formik, Field, FieldProps, FormikProps } from 'formik';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

import { containsErrors } from 'app/utils/validering/validerSøknad';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Select as NavSelect } from 'nav-frontend-skjema';
import { SelectChangeEvent } from 'app/types/events';
import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getCountries from 'app/utils/getCountries';
import getMessage from 'common/util/i18nUtils';
import validerOpphold, { getDatoAvgrensninger } from 'app/utils/validering/validerOpphold';
import './oppholdsvalg.less';

const cls = BEMHelper('oppholdsvalg');

interface Props {
    endre: boolean;
    opphold?: Utenlandsopphold;
    type: Oppholdstype;
    onAdd: (opphold: Utenlandsopphold) => void;
    onCancel: () => void;
    intl: InjectedIntl;
}

const Oppholdvalg: FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const {
        endre,
        opphold = {
            land: '',
            periode: {},
        },
        onAdd,
        onCancel,
        type,
        intl,
    } = props;

    const countries = useMemo(() => getCountries(true, false, intl), [intl]);

    return (
        <Formik
            initialValues={opphold}
            validate={validerOpphold(type, intl)}
            onSubmit={onAdd}
            render={({ values, errors, handleSubmit }: FormikProps<Utenlandsopphold>) => {
                const isValid = values.land && values.periode.fom && !containsErrors(errors);
                const datoAvgrensinger = getDatoAvgrensninger(type, values.periode.fom, values.periode.tom);

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
                                {getMessage(intl, `utenlandsopphold.modal.tittel${endre ? '.endre' : ''}`)}
                            </Undertittel>
                        </Block>
                        <Block margin="none">
                            <Block margin="xs">
                                <Field
                                    name="land"
                                    render={({ field, form }: FieldProps<string>) => (
                                        <NavSelect
                                            label={getMessage(intl, 'utenlandsopphold.land.label')}
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
                            <Block margin="xs">
                                <DatoInput
                                    fullskjermKalender
                                    name="periode.fom"
                                    label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                    datoAvgrensinger={datoAvgrensinger.fom}
                                />
                                <DatoInput
                                    fullskjermKalender
                                    name="periode.tom"
                                    datoAvgrensinger={datoAvgrensinger.tom}
                                    label={getMessage(intl, 'utenlandsopphold.land.tilOgMed')}
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
                        </Block>
                    </form>
                );
            }}
        />
    );
};

export default injectIntl(Oppholdvalg);
