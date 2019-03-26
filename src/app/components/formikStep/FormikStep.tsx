import React, { FunctionComponent, useEffect } from 'react';
import { CustomFormikProps } from 'app/types/Formik';
import Steg from '../steg/Steg';
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

    return <Steg {...props} />;
};

/*
class FormikStep extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        const {
            history,
            formikProps: { setFormikState },
        } = props;
        history.listen(() => {
            setFormikState({ submitCount: 0 });
        });
    }

    componentDidUpdate(previousProps: Props) {
        const previousValues = {
            isSubmitting: previousProps.formikProps.isSubmitting,
            isValid: previousProps.formikProps.isValid,
        };
        const currentValues = {
            isSubmitting: this.props.formikProps.isSubmitting,
            isValid: this.props.formikProps.isValid,
        };

        if (
            previousValues.isSubmitting === true &&
            currentValues.isSubmitting === false &&
            currentValues.isValid === true
        ) {
            const { onValidFormSubmit } = this.props;
            if (onValidFormSubmit) {
                onValidFormSubmit();
            }
        }
    }

    render() {
        return <Steg {...this.props} />;
    }
}
*/

export default FormikStep;
