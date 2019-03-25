import React, { FunctionComponent, useEffect } from 'react';
import { CustomFormikProps } from 'app/types/Formik';
import Steg from '../steg/Steg';
import useFormikSubmit from 'app/hooks/useFormikSubmit';
import { History } from 'history';
import SøknadStep from 'app/types/SøknadStep';

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

    return <Steg {...props} />;
};

export default FormikStep;
