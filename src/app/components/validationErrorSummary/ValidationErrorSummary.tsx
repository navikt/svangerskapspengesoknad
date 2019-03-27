import React, { FunctionComponent } from 'react';
import { connect } from 'formik';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { flattenErrors } from 'app/utils/errorUtils';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import getMessage from 'common/util/i18nUtils';
import './validationErrorSummary.less';

const cls = BEMHelper('validationErrorSummary');

type Props = InjectedIntlProps & FormikProps;

const ValidationErrorSummary: FunctionComponent<Props> = ({ formik: { errors, submitCount }, intl }) => {
    if (errors) {
        const errorMessages = flattenErrors(errors);

        return (
            <Block visible={errorMessages.length > 0 && submitCount > 0}>
                <Feiloppsummering
                    show
                    className={cls.block}
                    title={getMessage(intl, 'feiloppsummering.tittel')}
                    errors={errorMessages}
                />
            </Block>
        );
    }

    return null;
};

export default injectIntl(connect<InjectedIntlProps, UferdigSøknad>(ValidationErrorSummary));
