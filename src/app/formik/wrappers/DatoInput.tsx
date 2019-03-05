import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import CommonDatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import get from 'lodash/get';

interface Props {
    name: string;
    label: string;
}

const DatoInput: FunctionComponent<Props> = ({ name, label }) => (
    <Field
        name={name}
        type="date"
        render={({ form }: FieldProps) => (
            <CommonDatoInput
                id={name}
                name={name}
                label={label}
                dato={get(form.values, name)}
                onChange={(dato?: Date) => {
                    form.setFieldValue(name, dato);
                }}
            />
        )}
    />
);

export default DatoInput;
