import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Formik, FormikProps } from 'formik';

import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';

import BEMHelper from 'app/utils/bem';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Block from 'common/components/block/Block';
import { isValid } from 'i18n-iso-countries';
import getMessage from 'common/util/i18nUtils';
import InputField from 'app/formik/wrappers/InputField';
import DatoInput from 'app/formik/wrappers/DatoInput';

const cls = BEMHelper('frilans-oppdrag');

export interface ModalFormProps {
    endre: boolean;
    element?: any;
    type: Oppholdstype;
    onAdd: (næring: Næring) => void;
    onCancel: () => void;
}

type Props = ModalFormProps & InjectedIntlProps;
const FrilansOppdrag: FunctionComponent<Props> = (props: Props) => {
    const {
        endre,
        onCancel,
        element = {
            næringstyper: [],
        },
        onAdd,
        intl,
    } = props;

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
                            <InputField
                                name="selvstendigNæringsdrivende-orgnr"
                                label={getMessage(intl, 'selvstendigNæringsdrivende')}
                                required={true}
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
                                    name="periode.fom"
                                    label={getMessage(intl, 'utenlandsopphold.land.fraOgMed')}
                                />
                            </>
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

export default injectIntl(FrilansOppdrag);
