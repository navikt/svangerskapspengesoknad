import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { NavFrontendInputProps, Input } from 'nav-frontend-skjema';

interface Props {
    name: string;
}

const InputField: FunctionComponent<Props & NavFrontendInputProps> = ({ name, ...inputProps }) => {
    return (
        <Field
            name={name}
            type={inputProps.type}
            render={({ field, form }: FieldProps) => {
                return (
                    <Input
                        {...inputProps}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            form.setFieldValue(name, event.target.value);
                        }}
                    />
                );
            }}
        />
    );
};

export default InputField;
