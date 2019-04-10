import React, { FunctionComponent } from 'react';
import { CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import CheckboksPanelGruppeResponsive, {
    CheckboksPanelGruppeResponsiveProps,
} from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Omit } from 'lodash';

interface OwnProps {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

type Props = OwnProps &
    Omit<CheckboksPanelGruppeProps, 'onChange' | 'checkboxes' | 'legend'> &
    CheckboksPanelGruppeResponsiveProps;

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
                        checkboxes={options.map((option) => ({
                            ...option,
                            checked: form.values[name].includes(option.value),
                        }))}
                        onChange={(_, value) => {
                            const indexOfGrunnlag = form.values[name].indexOf(value);
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
