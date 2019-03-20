import React, { FunctionComponent, useMemo, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getCountries from 'app/utils/getCountries';
import getMessage from 'common/util/i18nUtils';
import Select from 'app/formik/wrappers/Select';
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

const initialOpphold = {
    land: '',
    periode: {},
};

const Oppholdvalg: FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { endre, opphold = initialOpphold, onAdd, onCancel, type, intl } = props;

    const countries = useMemo(() => getCountries(true, false, intl), [intl]);
    const [showErrors, toggleErrors] = useState(false);

    return (
        <Formik
            initialValues={opphold}
            validate={validerOpphold(type, intl)}
            onSubmit={onAdd}
            render={({ values, handleSubmit }: FormikProps<Utenlandsopphold>) => {
                const datoAvgrensinger = getDatoAvgrensninger(type, values.periode.fom, values.periode.tom);

                const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit();
                };

                const onSubmitClick = () => toggleErrors(true);

                return (
                    <form onSubmit={onFormSubmit} className={cls.block}>
                        <Block>
                            <Undertittel>
                                {getMessage(intl, `utenlandsopphold.modal.tittel${endre ? '.endre' : ''}`)}
                            </Undertittel>
                        </Block>
                        <Block margin="none">
                            <Block margin="xs">
                                <Select
                                    name="land"
                                    label={getMessage(intl, 'utenlandsopphold.land.label')}
                                    visFeil={showErrors}>
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
                            <Block margin="xs">
                                <DatoInput
                                    fullskjermKalender
                                    name="periode.fom"
                                    visFeil={showErrors}
                                    label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                    datoAvgrensinger={datoAvgrensinger.fom}
                                />
                                <DatoInput
                                    fullskjermKalender
                                    name="periode.tom"
                                    visFeil={showErrors}
                                    datoAvgrensinger={datoAvgrensinger.tom}
                                    label={getMessage(intl, 'utenlandsopphold.land.tilOgMed')}
                                />
                            </Block>
                            <Knapp htmlType="button" onClick={onCancel}>
                                <FormattedMessage id="utenlandsopphold.land.avbryt" />
                            </Knapp>
                            <Hovedknapp htmlType="submit" onClick={onSubmitClick}>
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
