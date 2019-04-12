import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { NavFrontendInputProps, Input } from 'nav-frontend-skjema';
import { get } from 'lodash';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { translateError } from 'app/utils/errorUtils';

interface OwnProps {
    name: string;
}

type Props = OwnProps & NavFrontendInputProps & InjectedIntlProps;

const InputField: FunctionComponent<Props> = ({ name, intl, ...inputProps }) => {
    return (
        <Field
            name={name}
            type={inputProps.type}
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, name);
                const feil =
                    feilmelding && form.submitCount > 0
                        ? {
                              feilmelding: translateError(intl, feilmelding)
                          }
                        : undefined;

                return (
                    <Input
                        {...field}
                        {...inputProps}
                        value={field.value === undefined ? '' : field.value}
                        feil={feil}
                    />
                );
            }}
        />
    );
};

export default injectIntl(InputField);
