import React, { ReactNode, FunctionComponent, useState, useEffect } from 'react';
import { Formik } from 'formik';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { logValidationErrors } from 'app/utils/devUtils';
import { parsePathFromLocation } from 'app/utils/stepUtils';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import history from 'app/utils/history';
import validateSøknad from 'app/utils/validation/validateSøknad';

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
}

const FormikWrapper: FunctionComponent<Props> = ({ contentRenderer }) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
      });

    useEffect(() => {
        return history.listen(setState);
    }, []);

    const currentPath = parsePathFromLocation(state.location);

    return (
        <Formik
            initialValues={initialSøknad}
            validate={(values: any) => {
                const errors = validateSøknad(currentPath)(values);
                logValidationErrors(currentPath, errors);
                return errors;
            }}
            onSubmit={(_søknad: UferdigSøknad, { setSubmitting, setFormikState, setTouched }: FormikBag) => {
                setSubmitting(false);
                /* @ts-ignore TS-feil-fiks */
                setFormikState({ submitCount: 0 });
                setTouched({});
            }}
            render={contentRenderer}
        />
    );
};

export default FormikWrapper;
