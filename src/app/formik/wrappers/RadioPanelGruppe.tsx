import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';

import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { Omit } from 'lodash';

type Props = Omit<RadioPanelGruppeResponsiveProps, 'onChange'>;

const RadioPanelGruppe: FunctionComponent<Props> = (radioPanelGruppeProps) => (
    <Field
        name={radioPanelGruppeProps.name}
        type="string"
        render={({ field, form }: FieldProps) => (
            <RadioPanelGruppeResponsive
                {...radioPanelGruppeProps}
                checked={field.value}
                onChange={(_, value) => {
                    form.setFieldValue(radioPanelGruppeProps.name, value);
                }}
            />
        )}
    />
);

export default RadioPanelGruppe;
