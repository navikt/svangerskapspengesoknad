import React, { ReactNode } from 'react';
import { BekreftCheckboksPanel as BekreftCheckboksPanelNav } from 'nav-frontend-skjema';
import { Field, FieldProps } from 'formik';
import { FunctionComponent } from 'react';

interface Props {
    label: string;
    name: string;
    children: ReactNode;
    className?: string;
}

const BekreftCheckboksPanel: FunctionComponent<Props> = ({ name, label, children, className }) => (
    <Field
        name={name}
        type="checkbox"
        render={({ field, form }: FieldProps) => (
            <BekreftCheckboksPanelNav
                checked={form.values[name]}
                label={label}
                onChange={field.onChange}
                className={className}
                inputProps={{
                    name: field.name,
                    onBlur: field.onBlur,
                }}
                feil={{
                    feilmelding: form.touched[name] && form.errors[name] ? form.errors[name] : '',
                }}>
                {children}
            </BekreftCheckboksPanelNav>
        )}
    />
);

export default BekreftCheckboksPanel;
