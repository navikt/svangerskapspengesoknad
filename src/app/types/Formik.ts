import { FormikContext } from 'formik';
import { UferdigSøknad } from './Søknad';

export interface FormikProps {
    formik: FormikContext<UferdigSøknad>;
}
