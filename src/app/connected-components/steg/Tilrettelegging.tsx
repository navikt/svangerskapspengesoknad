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
import { containsErrors } from 'app/utils/validering/validerSøknad';

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

    let visFørsteDag = false;
    if (
        (tilrettelegging.type === Tilretteleggingstype.DELVIS && tilrettelegging.stillingsprosent !== undefined) ||
        (tilrettelegging.type === Tilretteleggingstype.DELVIS || tilrettelegging.type === Tilretteleggingstype.HEL)
    ) {
        visFørsteDag = true;
    }

    const visNesteknapp =
        tilrettelegging.type === Tilretteleggingstype.INGEN || tilrettelegging.tilrettelagtArbeidFom !== undefined;

    const inneholderFeil = containsErrors(formik.errors.tilrettelegging);

    return (
        <Steg
            {...stegProps}
            disableNesteknapp={inneholderFeil}
            renderNesteknapp={props.renderNesteknapp && visNesteknapp}>
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
            <Block margin="xs" visible={visStillingsprosent}>
                {tilrettelegging.type === Tilretteleggingstype.DELVIS && (
                    <InputField
                        type="number"
                        bredde="M"
                        max={100}
                        min={0}
                        step={10}
                        placeholder="50"
                        name={`tilrettelegging.${index}.stillingsprosent`}
                        label={getMessage(intl, 'tilrettelegging.stillingsprosent.label')}
                    />
                )}
            </Block>
            <Block visible={visFørsteDag}>
                <DatoInput
                    name={`tilrettelegging.${index}.tilrettelagtArbeidFom`}
                    label={getMessage(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                    datoAvgrensinger={{
                        minDato: tilrettelegging.behovForTilretteleggingFom,
                        maksDato: formik.values.barn.fødselsdato,
                    }}
                />
            </Block>
        </Steg>
    );
};

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Tilrettelegging));
