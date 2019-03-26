import React, { ReactNode, FunctionComponent } from 'react';
import { Formik } from 'formik';
import { History } from 'history';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { parseStepFromHistory } from 'app/utils/stepUtils';

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
    history: History;
}

const SøknadForm: FunctionComponent<Props> = ({ contentRenderer, history }) => (
    <Formik
        initialValues={initialSøknad}
        validate={(values: UferdigSøknad) => {
            const step = parseStepFromHistory(history);
            const errors = validerSøknad(step)(values);
            console.log('Errors for', step, ':', errors);
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
