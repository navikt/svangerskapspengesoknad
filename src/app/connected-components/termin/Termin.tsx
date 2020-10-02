import React, { FunctionComponent } from 'react';
import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { HistoryProps } from 'app/redux/types/common';
import { useIntl } from 'react-intl';
import { navigateTo } from 'app/utils/navigationUtils';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import { etÅrSiden, niMånederFremITid, tiMånederSiden } from '../../../common/util/datoUtils';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

type Props = OwnProps & HistoryProps;

const Termin: FunctionComponent<Props> = (props) => {
    const { step, formikProps, history } = props;
    const { values } = formikProps;

    const intl = useIntl();

    const navigate = () => {
        navigateTo(getSøknadStepPath(StepID.ARBEIDSFORHOLD), history);
    };

    const showNesteknapp = values.barn.erBarnetFødt === false || values.barn.fødselsdato !== undefined;

    return (
        <Applikasjonsside visTittel={true} visSpråkvelger={true}>
            <FormikStep
                step={step}
                showNesteknapp={showNesteknapp}
                formikProps={formikProps}
                onValidFormSubmit={navigate}
                history={history}
            >
                <Block>
                    <DatoInput
                        name="barn.termindato"
                        label={getMessage(intl, 'termin.termindato')}
                        datoAvgrensinger={{
                            minDato: etÅrSiden(new Date()).toDate(),
                            maksDato: niMånederFremITid(new Date()).toDate(),
                        }}
                    />
                </Block>
                <Block visible={values.barn.termindato !== undefined}>
                    <JaNeiSpørsmål name="barn.erBarnetFødt" legend={getMessage(intl, 'termin.erBarnetFødt')} />
                </Block>
                <Block visible={values.barn.erBarnetFødt === true /*&& values.barn.termindato! <= new Date()*/}>
                    <DatoInput
                        name="barn.fødselsdato"
                        label={getMessage(intl, 'termin.fødselsdato')}
                        datoAvgrensinger={{
                            minDato: tiMånederSiden(values.barn.termindato!).toDate(),
                            maksDato: new Date(),
                        }}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

export default Termin;
