import React, { FunctionComponent } from 'react';
import { Form } from 'formik';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Link } from 'react-router-dom';

import { søknadStegPath } from 'app/utils/steg';
import BEMHelper from 'app/utils/bem';
import StegID from 'app/types/Steg';
import './steg.less';

const cls = BEMHelper('steg');

export interface StegProps {
    id: StegID;
    nesteStegID?: StegID;
    forrigeStegID?: StegID;
    renderNesteknapp?: boolean;
    renderSendeknapp?: boolean;
    onRequestNavigateToNextStep?: () => void;
}

const Steg: FunctionComponent<StegProps> = (props) => {
    const {
        id,
        nesteStegID,
        forrigeStegID,
        renderNesteknapp,
        renderSendeknapp,
        onRequestNavigateToNextStep,
        children,
    } = props;

    return (
        <Form className={cls.className}>
            {forrigeStegID && <Link to={søknadStegPath(forrigeStegID)}>Tilbake</Link>}
            <h1>{id}</h1>
            {children}
            {nesteStegID && renderNesteknapp && (
                <Hovedknapp htmlType="button" onClick={onRequestNavigateToNextStep}>
                    Neste
                </Hovedknapp>
            )}
            {renderSendeknapp && <Hovedknapp htmlType="submit">Send søknad</Hovedknapp>}
        </Form>
    );
};

export default Steg;
