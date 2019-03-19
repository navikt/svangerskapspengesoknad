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
            const fieldError = get(form.errors, name) as string;

            return (
                <CommonDatoInput
                    {...datoInputProps}
                    feil={
                        fieldError
                            ? {
                                  feilmelding: fieldError,
                              }
                            : undefined
                    }
                    kalender={{
                        plassering: fullskjermKalender ? 'fullskjerm' : 'under',
                    }}
                    id={name}
                    name={name}
                    label={label}
                    dato={get(form.values, name)}
                    onChange={(dato?: Date) => {
                        form.setFieldValue(name, dato);
                    }}
                />
            );
        }}
    />
);

export default DatoInput;
