import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';
import { SelectChangeEvent } from 'app/types/events';
import get from 'lodash/get';

interface Props {
    name: string;
    label: string;
}

const Select: FunctionComponent<Props> = (props) => {
    const { name, label, children } = props;
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<any>) => (
                <NavSelect
                    {...field}
                    label={label}
                    onChange={(e: SelectChangeEvent) => {
                        form.setFieldValue(field.name, e.target.value);
                    }}
                    feil={
                        form.submitCount > 0 && get(form.errors, name)
                            ? {
                                  feilmelding: get(form.errors, name),
                              }
                            : undefined
                    }>
                    {children}
                </NavSelect>
            )}
        />
    );
};

export default Select;
