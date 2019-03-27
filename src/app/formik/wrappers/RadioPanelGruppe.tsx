import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';

import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { Omit } from 'lodash';

type Props = Omit<RadioPanelGruppeResponsiveProps, 'onChange'> & {
    id?: string;
    value?: string;
};

const RadioPanelGruppe: FunctionComponent<Props> = ({ id, value, ...radioPanelGruppeProps }) => (
    <Field
        name={radioPanelGruppeProps.name}
        type="string"
        render={({ field, form }: FieldProps) => (
            <RadioPanelGruppeResponsive
                {...radioPanelGruppeProps}
                name={id || radioPanelGruppeProps.name}
                checked={value || field.value}
                onChange={(_, newValue) => {
                    form.setFieldValue(radioPanelGruppeProps.name, newValue);
                }}
            />
        )}
    />
);

export default RadioPanelGruppe;
