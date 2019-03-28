import React, { ReactNode } from 'react';
import { BekreftCheckboksPanel as BekreftCheckboksPanelNav } from 'nav-frontend-skjema';
import { Field, FieldProps } from 'formik';
import { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { translateError } from 'app/utils/errorUtils';

interface Props {
    label: string;
    name: string;
    children: ReactNode;
    className?: string;
}

const BekreftCheckboksPanel: FunctionComponent<Props & InjectedIntlProps> = ({
    name,
    label,
    children,
    className,
    intl,
}) => (
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
                    feilmelding: form.touched[name] && form.errors[name] ? translateError(intl, form.errors[name]) : '',
                }}>
                {children}
            </BekreftCheckboksPanelNav>
        )}
    />
);

export default injectIntl(BekreftCheckboksPanel);
