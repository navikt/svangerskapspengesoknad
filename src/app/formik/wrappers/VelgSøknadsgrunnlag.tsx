import React, { FunctionComponent } from 'react';
import { CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import { FieldArrayRenderProps, FieldArray } from 'formik';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Omit } from 'lodash';
import { Søknadsgrunnlag } from 'app/types/Søknad';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

export interface SøknadsgrunnlagOption {
    value: string;
    type: Arbeidsforholdstype;
    label: string;
}

interface OwnProps {
    name: string;
    label: string;
    options: SøknadsgrunnlagOption[];
}

type Props = OwnProps & Omit<CheckboksPanelGruppeProps, 'onChange' | 'checkboxes' | 'legend'>;

const VelgSøknadsgrunnlag: FunctionComponent<Props> = (props) => {
    const { name, label, options, ...checkboksPanelGruppeProps } = props;

    return (
        <FieldArray
            name={name}
            render={({ form, push, remove }: FieldArrayRenderProps) => {
                return (
                    <CheckboksPanelGruppeResponsive
                        columns={1}
                        {...checkboksPanelGruppeProps}
                        legend={label}
                        checkboxes={options.map((option) => ({
                            ...option,
                            checked: form.values[name].some((v: Søknadsgrunnlag) => v.id === option.value)
                        }))}
                        onChange={(_, value) => {
                            const indexOfGrunnlag = form.values[name].findIndex((v: Søknadsgrunnlag) => v.id === value);
                            const matchingOption = options.find((o) => o.value === value);

                            if (matchingOption) {
                                if (indexOfGrunnlag === -1) {
                                    push({
                                        id: value,
                                        type: matchingOption.type
                                    });
                                } else {
                                    remove(indexOfGrunnlag);
                                }
                            }
                        }}
                    />
                );
            }}
        />
    );
};

export default VelgSøknadsgrunnlag;
