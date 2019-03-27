import React, { FunctionComponent, useEffect } from 'react';
import { CustomFormikProps } from 'app/types/Formik';
import Step from '../step/Step';
import { History } from 'history';
import SøknadStep from 'app/types/SøknadStep';
import useFormikSubmit from 'app/hooks/useFormikSubmit';

interface Props {
    step: SøknadStep;
    formikProps: CustomFormikProps;
    onValidFormSubmit?: () => void;
    showNesteknapp: boolean;
    className?: string;
    history: History;
}

const FormikStep: FunctionComponent<Props> = (props) => {
    const { formikProps, onValidFormSubmit, history } = props;

    useEffect(() => {
        history.listen(() => {
            formikProps.setFormikState({ submitCount: 0 });
        });
    });

    useFormikSubmit(formikProps.isSubmitting, formikProps.isValid, () => {
        if (onValidFormSubmit) {
            onValidFormSubmit();
        }
    });

    return <Step {...props} />;
};

export default FormikStep;
