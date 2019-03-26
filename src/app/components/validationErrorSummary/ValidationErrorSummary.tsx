import React, { FunctionComponent } from 'react';
import { connect } from 'formik';
import { UferdigSøknad } from 'app/types/Søknad';
import { FormikProps } from 'app/types/Formik';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import { flattenErrors } from 'app/utils/validering/validerSøknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';

type Props = InjectedIntlProps & FormikProps;

const ValidationErrorSummary: FunctionComponent<Props> = ({ formik: { errors, submitCount }, intl }) => {
    if (errors) {
        const errorMessages = flattenErrors(errors);

        return (
            <Block visible={errorMessages.length > 0 && submitCount > 0}>
                <Feiloppsummering show title={getMessage(intl, 'feiloppsummering.tittel')} errors={errorMessages} />
            </Block>
        );
    }

    return null;
};

export default injectIntl(connect<InjectedIntlProps, UferdigSøknad>(ValidationErrorSummary));
