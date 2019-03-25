import { useState, useEffect } from 'react';

const useFormikSubmit = (isSubmitting: boolean, isValid: boolean, onSubmit: () => void) => {
    const [wasSubmitting, setSubmittingForm] = useState<boolean>(false);

    useEffect(() => {
        if (!wasSubmitting && isSubmitting && isValid) {
            onSubmit();
        }

        setSubmittingForm(isSubmitting);
    }, [isSubmitting, isValid]);
};

export default useFormikSubmit;
