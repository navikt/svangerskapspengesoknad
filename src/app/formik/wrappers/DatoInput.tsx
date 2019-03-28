import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import CommonDatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import get from 'lodash/get';
import { Omit } from 'lodash';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { translateError } from 'app/utils/errorUtils';

interface OwnProps {
    name: string;
    label: string;
    fullskjermKalender?: boolean;
}

type Props = OwnProps & Omit<DatoInputProps, 'id' | 'onChange'>;

const DatoInput: FunctionComponent<Props & InjectedIntlProps> = ({
    name,
    label,
    fullskjermKalender,
    intl,
    ...datoInputProps
}) => (
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
                    feil={
                        feilmelding && form.submitCount > 0
                            ? { feilmelding: translateError(intl, feilmelding) }
                            : undefined
                    }
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

export default injectIntl(DatoInput);
