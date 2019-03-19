import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { Select as NavSelect } from 'nav-frontend-skjema';
import { SelectChangeEvent } from 'app/types/events';

interface Props {
    label: string;
    name: string;
}

const Select: FunctionComponent<Props> = (props) => {
    const { label, children } = props;
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<string>) => (
                <NavSelect
                    label={label}
                    value={field.value}
                    onChange={(e: SelectChangeEvent) => {
                        form.setFieldValue(field.name, e.target.value);
                    }}>
                    {children}
                </NavSelect>
            )}
        />
    );
};

export default Select;
