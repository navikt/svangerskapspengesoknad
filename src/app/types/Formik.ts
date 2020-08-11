import { UferdigSøknad } from './Søknad';
import { FormikProps as FormikActualProps } from 'formik';

export interface FormikProps {
    formik: FormikActualProps<UferdigSøknad>;
}

export type CustomFormikProps = FormikActualProps<UferdigSøknad> & { submitForm: () => Promise<void> };
