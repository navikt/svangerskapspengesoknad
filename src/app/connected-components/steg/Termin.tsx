import React, { FunctionComponent } from 'react';
import { connect as formConnect } from 'formik';

import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import Steg, { StegProps } from '../../components/steg/Steg';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';

type OuterProps = StegProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Termin: FunctionComponent<Props> = ({ formik, intl, ...stegProps }) => {
    return (
        <Steg
            {...stegProps}
            renderNesteknapp={
                formik.values.barn.erBarnetFødt === false || formik.values.barn.fødselsdato !== undefined
            }>
            <Block margin="xs">
                <DatoInput name="barn.termindato" label={getMessage(intl, 'termin.termindato')} />
            </Block>
            <Block margin="m" visible={formik.values.barn.termindato !== undefined}>
                <JaNeiSpørsmål name="barn.erBarnetFødt" legend={getMessage(intl, 'termin.erBarnetFødt')} />
            </Block>
            <Block margin="xs" visible={formik.values.barn.erBarnetFødt === true}>
                <DatoInput name="barn.fødselsdato" label={getMessage(intl, 'termin.fødselsdato')} />
            </Block>
        </Steg>
    );
};

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Termin));
