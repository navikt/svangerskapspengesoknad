import React, { ReactNode, FunctionComponent } from 'react';
import { Formik } from 'formik';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { StepID } from 'app/types/SøknadStep';

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
}

const SøknadForm: FunctionComponent<Props> = ({ contentRenderer }) => (
    <Formik
        initialValues={initialSøknad}
        validate={(values: UferdigSøknad) => {
            const errors = validerSøknad(StepID.TERMIN)(values);
            console.log('Errors:', errors);
            return errors;
        }}
        onSubmit={(søknad: UferdigSøknad, { setSubmitting, setFormikState, setTouched }: FormikBag) => {
            setSubmitting(false);
            setFormikState({ submitCount: 0 });
            setTouched({});
        }}
        render={contentRenderer}
    />
);

export default SøknadForm;
