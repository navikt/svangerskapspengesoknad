import React, { FunctionComponent } from 'react';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import CheckboksPanelGruppeResponsive, {
    CheckboxPanelgruppeResponsiveProps
} from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Omit, get } from 'lodash';
import { translateError } from '../../utils/errorUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface OwnProps {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

type Props = OwnProps &
    Omit<CheckboxPanelgruppeResponsiveProps, 'onChange' | 'checkboxes' | 'legend'> &
    InjectedIntlProps;

const CheckboksPanelGruppe: FunctionComponent<Props> = (props) => {
    const { name, label, options, intl, ...checkboksPanelGruppeProps } = props;

    return (
        <FieldArray
            name={name}
            render={({ form, push, remove }: FieldArrayRenderProps) => {
                const feilmelding = get(form.errors, name) as string;
                return (
                    <CheckboksPanelGruppeResponsive
                        {...checkboksPanelGruppeProps}
                        feil={
                            feilmelding && form.submitCount > 0
                                ? { feilmelding: translateError(intl, feilmelding) }
                                : undefined
                        }
                        legend={label}
                        checkboxes={options.map((option) => {
                            const values = get(form.values, name);
                            return {
                                ...option,
                                checked: values && values.includes(option.value) ? true : false
                            };
                        })}
                        onChange={(_, value) => {
                            const values = get(form.values, name) || [];
                            const indexOfGrunnlag = values.indexOf(value);
                            if (indexOfGrunnlag === -1) {
                                push(value);
                            } else {
                                remove(indexOfGrunnlag);
                            }
                        }}
                    />
                );
            }}
        />
    );
};

export default injectIntl(CheckboksPanelGruppe);
