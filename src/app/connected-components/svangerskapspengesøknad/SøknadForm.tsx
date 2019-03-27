import React, { ReactNode, FunctionComponent, useState } from 'react';
import { Formik } from 'formik';
import { createBrowserHistory, Location } from 'history';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import validerSøknad from 'app/utils/validering/validerSøknad';
import { parsePathFromLocation } from 'app/utils/stepUtils';

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
}

const history = createBrowserHistory();

const SøknadForm: FunctionComponent<Props> = ({ contentRenderer }) => {
    const [currentPath, setPath] = useState(parsePathFromLocation(history.location));

    history.listen((location: Location) => {
        setPath(parsePathFromLocation(location));
    });

    return (
        <Formik
            initialValues={initialSøknad}
            validate={validerSøknad(currentPath)}
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
