import React, { FunctionComponent } from 'react';
import { Field, FieldProps } from 'formik';
import { get, Omit } from 'lodash';

import RadioPanelGruppeResponsive, {
    RadioPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

type Props = Omit<RadioPanelGruppeResponsiveProps, 'radios' | 'onChange'>;

enum Radios {
    'JA' = 'ja',
    'NEI' = 'nei',
}

const JaNeiSpørsmål: FunctionComponent<Props & InjectedIntlProps> = ({ intl, name, ...radioPanelGruppeProps }) => (
    <Field
        name={name}
        type="string"
        render={({ field, form }: FieldProps) => {
            let checked;
            if (field.value === true) {
                checked = Radios.JA;
            } else if (field.value === false) {
                checked = Radios.NEI;
            }

            const radios = [
                {
                    label: getMessage(intl, 'jaNeiSpørsmål.ja'),
                    value: Radios.JA,
                },
                {
                    label: getMessage(intl, 'jaNeiSpørsmål.nei'),
                    value: Radios.NEI,
                },
            ];

            const feilmelding = get(form.errors, name);
            const radioPanelGruppeFeil = feilmelding
                ? {
                      feilmelding,
                  }
                : undefined;

            return (
                <RadioPanelGruppeResponsive
                    {...radioPanelGruppeProps}
                    name={name}
                    radios={radios}
                    feil={radioPanelGruppeFeil}
                    checked={checked}
                    onChange={(_, value) => {
                        form.setFieldValue(name, value === Radios.JA);
                    }}
                />
            );
        }}
    />
);

export default injectIntl(JaNeiSpørsmål);
