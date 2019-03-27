import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import CommonDatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import get from 'lodash/get';
import { Omit } from 'lodash';

interface OwnProps {
    name: string;
    label: string;
    fullskjermKalender?: boolean;
}

type Props = OwnProps & Omit<DatoInputProps, 'id' | 'onChange'>;

const DatoInput: FunctionComponent<Props> = ({ name, label, fullskjermKalender, ...datoInputProps }) => (
    <Field
        name={name}
        type="date"
        render={({ form }: FieldProps) => {
            const feilmelding = get(form.errors, name) as string;

            return (
                <CommonDatoInput
                    {...datoInputProps}
                    name={name}
                    id={name}
                    label={label}
                    dato={get(form.values, name)}
                    feil={feilmelding && form.submitCount > 0 ? { feilmelding } : undefined}
                    onChange={(dato?: Date) => {
                        form.setFieldValue(name, dato);
                    }}
                    kalender={{
                        plassering: fullskjermKalender ? 'fullskjerm' : 'under',
                    }}
                />
            );
        }}
    />
);

export default DatoInput;
