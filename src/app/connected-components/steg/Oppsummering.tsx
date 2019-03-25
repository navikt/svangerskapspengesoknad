import React, { FunctionComponent } from 'react';
import Steg, { StegProps } from '../../components/steg/Steg';
import { connect as formConnect } from 'formik';

import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import Block from 'common/components/block/Block';

type Props = StegProps & FormikProps;

/*
interface StateProps {
    vedlegg: Attachment[];
    requestSendSøknad: (søknad: Søknad) => void;
}
*/

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

/*
const mapStateToProps = (state: State) => ({
    vedlegg: state.attachment.vedlegg,
});

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: (søknad: Søknad) => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad } });
    },
});
*/

export default formConnect<StegProps, UferdigSøknad>(Oppsummering);
