import React, { ReactNode, FunctionComponent, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Location } from 'history';

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
    const [currentPath, setPath] = useState(parsePathFromLocation(history.location));

    const onRouteChange = (location: Location) => {
        setPath(parsePathFromLocation(location));
    };

    useEffect(() => {
        setPath(parsePathFromLocation(history.location));
        return history.listen(onRouteChange);
    }, []);

    return (
        <Formik
            initialValues={initialSøknad}
            validate={(values: any) => {
                const errors = validateSøknad(currentPath)(values);
                logValidationErrors(currentPath, errors);
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
};

export default FormikWrapper;
