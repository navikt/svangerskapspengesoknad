import React, { FunctionComponent } from 'react';
import Steg, { StegProps } from '../../components/steg/Steg';
import { connect as formConnect } from 'formik';

import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import Block from 'common/components/block/Block';

type Props = StegProps & FormikProps;

const Oppsummering: FunctionComponent<Props> = ({ formik, ...stegProps }) => {
    return (
        <Steg {...stegProps}>
            <Block>
                <code
                    id="oppsummering-placeholder"
                    style={{
                        wordWrap: 'break-word',
                    }}>
                    {JSON.stringify(formik.values)}
                </code>
            </Block>
        </Steg>
    );
};

export default formConnect<StegProps, UferdigSøknad>(Oppsummering);
