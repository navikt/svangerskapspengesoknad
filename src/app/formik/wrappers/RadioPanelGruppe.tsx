import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';

import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { Omit } from 'lodash';

type Props = Omit<RadioPanelGruppeResponsiveProps, 'onChange'> & {
    id?: string;
};

const RadioPanelGruppe: FunctionComponent<Props> = ({ id, ...radioPanelGruppeProps }) => (
    <Field
        name={radioPanelGruppeProps.name}
        type="string"
        render={({ field, form }: FieldProps) => (
            <RadioPanelGruppeResponsive
                {...radioPanelGruppeProps}
                name={id || radioPanelGruppeProps.name}
                checked={field.value}
                onChange={(_, value) => {
                    form.setFieldValue(radioPanelGruppeProps.name, value);
                }}
            />
        )}
    />
);

export default RadioPanelGruppe;
