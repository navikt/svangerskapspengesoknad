import React, { ReactNode, FunctionComponent, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Location } from 'history';
import isEmpty from 'lodash/isEmpty';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { parsePathFromLocation } from 'app/utils/stepUtils';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import history from 'app/utils/history';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { appIsRunningInDevEnvironment } from 'app/utils/envUtils';

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
}

const SøknadForm: FunctionComponent<Props> = ({ contentRenderer }) => {
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
                const errors = validerSøknad(currentPath)(values);

                if (appIsRunningInDevEnvironment()) {
                    if (!isEmpty(errors)) {
                        // tslint:disable-next-line
                        console.log(`❌ Validation errors for ${currentPath.path}/${currentPath.step || ''}:`, errors);
                    }
                }

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

export default SøknadForm;
