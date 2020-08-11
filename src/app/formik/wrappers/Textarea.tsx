import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { Textarea as NavFrontendTextarea, TextareaProps } from 'nav-frontend-skjema';
import { get } from 'lodash';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { translateError } from 'app/utils/errorUtils';
import { Omit } from 'react-redux';

interface OwnProps {
    name: string;
}

type Props = OwnProps & Omit<TextareaProps, 'value' | 'onChange'> & InjectedIntlProps;

const Textarea: FunctionComponent<Props> = ({ name, intl, ...textareaProps }) => {
    return (
        <Field
            name={name}
            type="textarea"
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, name);
                const feil =
                    feilmelding && form.submitCount > 0
                        ? {
                              feilmelding: translateError(intl, feilmelding),
                          }
                        : undefined;

                return (
                    <NavFrontendTextarea
                        {...field}
                        {...textareaProps}
                        value={field.value === undefined ? '' : field.value}
                        feil={feil}
                    />
                );
            }}
        />
    );
};

export default injectIntl(Textarea);
