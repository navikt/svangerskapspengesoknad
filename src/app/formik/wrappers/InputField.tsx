import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { NavFrontendInputProps, Input } from 'nav-frontend-skjema';
import { get } from 'lodash';

interface Props {
    name: string;
}

const InputField: FunctionComponent<Props & NavFrontendInputProps> = ({ name, ...inputProps }) => {
    return (
        <Field
            name={name}
            type={inputProps.type}
            render={({ field, form }: FieldProps) => {
                const feilmelding = get(form.errors, name);
                const feil = feilmelding
                    ? {
                          feilmelding,
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

export default InputField;
