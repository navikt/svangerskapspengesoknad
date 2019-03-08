import React, { FunctionComponent } from 'react';
import { connect as formConnect } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Steg, { StegProps } from 'app/components/steg/Steg';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import DatoInput from 'app/formik/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';
import Block from 'common/components/block/Block';
import RadioPanelGruppe from 'app/formik/wrappers/RadioPanelGruppe';
import InputField from 'app/formik/wrappers/InputField';

interface OwnProps {
    tilretteleggingId: string;
    tilretteleggingIndex: number;
}

type OuterProps = OwnProps & StegProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Tilrettelegging: FunctionComponent<Props> = (props) => {
    const { formik, tilretteleggingId: id, tilretteleggingIndex: index, intl, ...stegProps } = props;
    const tilrettelegging = formik.values.tilrettelegging[index];
    const visTypevelger = tilrettelegging.behovForTilretteleggingFom !== undefined;
    const visStillingsprosent = tilrettelegging.type === Tilretteleggingstype.DELVIS;

    return (
        <Steg {...stegProps}>
            <Block margin="xs">
                <DatoInput
                    name={`tilrettelegging.${index}.behovForTilretteleggingFom`}
                    label={getMessage(intl, 'tilrettelegging.behovForTilretteleggingFom.label')}
                />
            </Block>
            <Block visible={visTypevelger}>
                <RadioPanelGruppe
                    name={`tilrettelegging.${index}.type`}
                    legend={getMessage(intl, 'tilrettelegging.type.label')}
                    onChange={() => {}}
                    radios={[
                        {
                            value: Tilretteleggingstype.INGEN,
                            label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.INGEN}`),
                        },
                        {
                            value: Tilretteleggingstype.DELVIS,
                            label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.DELVIS}`),
                        },
                        {
                            value: Tilretteleggingstype.HEL,
                            label: getMessage(intl, `tilrettelegging.type.${Tilretteleggingstype.HEL}`),
                        },
                    ]}
                />
            </Block>
            <Block visible={visStillingsprosent}>
                {tilrettelegging.type === Tilretteleggingstype.DELVIS && (
                    <InputField
                        value={tilrettelegging.stillingsprosent}
                        type="number"
                        max={100}
                        min={0}
                        step={10}
                        placeholder="50"
                        name={`tilrettelegging.${index}.stillingsprosent`}
                        label={getMessage(intl, 'tilrettelegging.stillingsprosent.label')}
                    />
                )}
            </Block>
        </Steg>
    );
};

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Tilrettelegging));
