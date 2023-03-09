import React, { FunctionComponent } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Formik, FormikProps } from 'formik';

import { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';

import BEMHelper from 'common/util/bem';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Block from 'common/components/block/Block';
import { isValid } from 'i18n-iso-countries';
import getMessage from 'common/util/i18nUtils';
import InputField from 'app/formik/wrappers/InputField';
import DatoInput from 'app/formik/wrappers/DatoInput';
import { Undertittel } from 'nav-frontend-typografi';
import Knapperad from 'common/components/knapperad/Knapperad';
import DatoerInputLayout from 'common/components/layout/datoerInputLayout/DatoerInputLayout';
import { ModalFormProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { FrilansOppdrag as FrilansOppdragType } from '../../../types/FrilansInformasjon';
import validateFrilansoppdrag from 'app/utils/validation/validateFrilansoppdrag';

import './frilansOppdrag.less';

const cls = BEMHelper('frilansOppdrag');

type Props = ModalFormProps<FrilansOppdragType>;

const FrilansOppdrag: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { endre, onCancel, element = {}, onAdd } = props;

    return (
        <Formik
            // @ts-ignore Fiks
            initialValues={element}
            validate={validateFrilansoppdrag()}
            // @ts-ignore Fiks
            onSubmit={onAdd}
            render={({ handleSubmit }: FormikProps<Utenlandsopphold>) => {
                return (
                    <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className={cls.block}
                    >
                        <Block>
                            <Undertittel>{getMessage(intl, 'arbeidsforhold.frilans.oppdrag.tittel')}</Undertittel>
                        </Block>

                        <Block>
                            <InputField
                                name="navnPåArbeidsgiver"
                                label={getMessage(intl, 'arbeidsforhold.frilans.oppdrag.navnPåArbeidsgiver')}
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

                        <Knapperad align="center">
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

export default FrilansOppdrag;
