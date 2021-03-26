import { UferdigSøknad } from './Søknad';
import { FormikContextType, FormikProps as FormikActualProps } from 'formik';

export interface FormikProps {
    formik: FormikContextType<UferdigSøknad>;
}

export type CustomFormikProps = FormikActualProps<UferdigSøknad> & { submitForm: () => Promise<void> };
