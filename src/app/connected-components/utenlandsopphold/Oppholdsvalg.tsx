import React, { FunctionComponent, useMemo } from 'react';
import { Formik, FormikProps } from 'formik';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getCountries from 'app/utils/getCountries';
import getMessage from 'common/util/i18nUtils';
import Select from 'app/formik/wrappers/Select';
import validateOpphold, { getDatoAvgrensninger } from 'app/utils/validation/validateOpphold';
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
    tidsperiode: {}
};

const Oppholdvalg: FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const { endre, opphold = initialOpphold, onAdd, onCancel, type, intl } = props;

    const countries = useMemo(() => getCountries(true, false, intl), [intl]);

    return (
        <Formik
            initialValues={opphold}
            validate={validateOpphold(type)}
            onSubmit={onAdd}
            render={({ values, handleSubmit }: FormikProps<Utenlandsopphold>) => {
                const datoAvgrensinger = getDatoAvgrensninger(type, values.tidsperiode.fom, values.tidsperiode.tom);

                const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit();
                };

                return (
                    <form onSubmit={onFormSubmit} className={cls.block}>
                        <Block>
                            <Undertittel>
                                {getMessage(intl, `utenlandsopphold.modal.tittel${endre ? '.endre' : ''}`)}
                            </Undertittel>
                        </Block>
                        <Block margin="none">
                            <Block margin="xs">
                                <Select name="land" label={getMessage(intl, 'utenlandsopphold.land.label')}>
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
                                    fullskjermKalender={true}
                                    name="tidsperiode.fom"
                                    label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                    datoAvgrensinger={datoAvgrensinger.fom}
                                />
                                <DatoInput
                                    fullskjermKalender={true}
                                    name="tidsperiode.tom"
                                    datoAvgrensinger={datoAvgrensinger.tom}
                                    label={getMessage(intl, 'utenlandsopphold.land.tilOgMed')}
                                />
                            </Block>
                            <Knapp htmlType="button" onClick={onCancel}>
                                <FormattedMessage id="utenlandsopphold.land.avbryt" />
                            </Knapp>
                            <Hovedknapp htmlType="submit">
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
