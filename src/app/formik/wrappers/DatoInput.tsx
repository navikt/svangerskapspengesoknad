import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import CommonDatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import get from 'lodash/get';
import { Omit } from 'lodash';

interface OwnProps {
    name: string;
    label: string;
}

type Props = OwnProps & Omit<DatoInputProps, 'id' | 'onChange'>;

const DatoInput: FunctionComponent<Props> = ({ name, label, ...datoInputProps }) => (
    <Field
        name={name}
        type="date"
        render={({ form }: FieldProps) => (
            <CommonDatoInput
                {...datoInputProps}
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
