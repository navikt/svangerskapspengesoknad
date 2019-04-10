import React, { FunctionComponent } from 'react';
import { CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Omit, get } from 'lodash';

interface OwnProps {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

type Props = OwnProps & Omit<CheckboksPanelGruppeProps, 'onChange' | 'checkboxes' | 'legend'>;

const CheckboksPanelGruppe: FunctionComponent<Props> = (props) => {
    const { name, label, options, ...checkboksPanelGruppeProps } = props;

    return (
        <FieldArray
            name={name}
            render={({ form, push, remove }: FieldArrayRenderProps) => {
                return (
                    <CheckboksPanelGruppeResponsive
                        {...checkboksPanelGruppeProps}
                        legend={label}
                        checkboxes={options.map((option) => {
                            const values = get(form.values, name);
                            return {
                                ...option,
                                checked: values && values.includes(option.value),
                            };
                        })}
                        onChange={(_, value) => {
                            const values = get(form.values, name);
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

export default CheckboksPanelGruppe;
