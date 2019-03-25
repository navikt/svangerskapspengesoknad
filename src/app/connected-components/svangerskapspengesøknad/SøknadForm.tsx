import React, { ReactNode, FunctionComponent } from 'react';
import { Formik } from 'formik';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
}

const SøknadForm: FunctionComponent<Props> = ({ contentRenderer }) => (
    <Formik
        initialValues={initialSøknad}
        validate={validerSøknad}
        onSubmit={(søknad: UferdigSøknad, { setSubmitting, setFormikState, setTouched }: FormikBag) => {
            console.warn('Submitting?', søknad);
            setSubmitting(false);
            setFormikState({ submitCount: 0 });
            setTouched({});
        }}
        render={contentRenderer}
    />
);

export default SøknadForm;
