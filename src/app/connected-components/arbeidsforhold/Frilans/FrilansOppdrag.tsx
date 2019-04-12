import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Formik, FormikProps } from 'formik';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';

import BEMHelper from 'common/util/bem';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Block from 'common/components/block/Block';
import { isValid } from 'i18n-iso-countries';
import getMessage from 'common/util/i18nUtils';
import InputField from 'app/formik/wrappers/InputField';
import DatoInput from 'app/formik/wrappers/DatoInput';
import { Undertittel } from 'nav-frontend-typografi';

import './frilansOppdrag.less';

const cls = BEMHelper('frilansOppdrag');

export interface ModalFormProps {
    endre: boolean;
    element?: any;
    type: Oppholdstype;
    onAdd: (næring: Næring) => void;
    onCancel: () => void;
}

type Props = ModalFormProps & InjectedIntlProps;
const FrilansOppdrag: FunctionComponent<Props> = (props: Props) => {
    const { endre, onCancel, element = {}, onAdd, intl } = props;

    return (
        <Formik
            initialValues={element}
            // tslint:disable-next-line: no-empty
            validate={() => {}} // TODO
            onSubmit={onAdd}
            render={({ handleSubmit }: FormikProps<Utenlandsopphold>) => {
                return (
                    <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className={cls.block}>
                        <Block>
                            <Undertittel>{getMessage(intl, 'arbeidsforhold.frilans.oppdrag.tittel')}</Undertittel>
                        </Block>

                        <Block margin="xxs">
                            <InputField
                                name="navnPåArbeidsgiver"
                                label={getMessage(intl, 'arbeidsforhold.frilans.oppdrag.navnPåArbeidsgiver')}
                                required={true}
                            />
                        </Block>

                        <Block margin="xxs">
                            <div className={cls.element('datoer')}>
                                <DatoInput
                                    fullskjermKalender={true}
                                    name="tidsperiode.fom"
                                    label={getMessage(intl, 'fraOgMed')}
                                />
                                <DatoInput
                                    fullskjermKalender={true}
                                    name="tidsperiode.tom"
                                    label={getMessage(intl, 'tilOgMed')}
                                />
                            </div>
                        </Block>

                        <div className={cls.element('knapper')}>
                            <Knapp htmlType="button" onClick={onCancel}>
                                <FormattedMessage id="avbryt" />
                            </Knapp>
                            <Hovedknapp disabled={!isValid} htmlType="submit">
                                <FormattedMessage id={endre ? 'endre' : 'leggTil'} />
                            </Hovedknapp>
                        </div>
                    </form>
                );
            }}
        />
    );
};

export default injectIntl(FrilansOppdrag);
