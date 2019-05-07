import React, { FunctionComponent } from 'react';

import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { HistoryProps } from 'app/redux/types/common';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { navigateTo } from 'app/utils/navigationUtils';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import * as moment from 'moment';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

type Props = OwnProps & InjectedIntlProps & HistoryProps;

const Termin: FunctionComponent<Props> = (props) => {
    const { step, formikProps, intl, history } = props;
    const { values, setFieldValue } = formikProps;

    const erTermindatoFør4UkerFremITid = moment(values.barn.termindato).isBefore(moment().add(4, 'weeks'));
    const showNesteknapp =
        values.barn.erBarnetFødt === false ||
        values.barn.fødselsdato !== undefined ||
        (!erTermindatoFør4UkerFremITid && values.barn.erBarnetFødt !== undefined);

    const cleanupTermin = () => {
        return { ...values.barn, fødselsdato: erTermindatoFør4UkerFremITid ? values.barn.fødselsdato : undefined };
    };

    const navigate = () => {
        setFieldValue('barn', cleanupTermin());
        navigateTo(getSøknadStepPath(StepID.ARBEIDSFORHOLD), history);
    };

    return (
        <Applikasjonsside visTittel={true}>
            <FormikStep
                step={step}
                showNesteknapp={showNesteknapp}
                formikProps={formikProps}
                onValidFormSubmit={navigate}
                history={history}>
                <Block>
                    <DatoInput name="barn.termindato" label={getMessage(intl, 'termin.termindato')} />
                </Block>
                <Block visible={values.barn.termindato !== undefined}>
                    <JaNeiSpørsmål name="barn.erBarnetFødt" legend={getMessage(intl, 'termin.erBarnetFødt')} />
                </Block>
                <Block visible={values.barn.erBarnetFødt === true && erTermindatoFør4UkerFremITid}>
                    <DatoInput
                        name="barn.fødselsdato"
                        label={getMessage(intl, 'termin.fødselsdato')}
                        datoAvgrensinger={{
                            maksDato: new Date()
                        }}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

export default injectIntl(Termin);
