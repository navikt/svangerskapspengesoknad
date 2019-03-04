import React, { FunctionComponent } from 'react';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';

import { søknadStegPath } from 'app/utils/stegUtils';
import BackButton from 'common/components/back-button/BackButton';
import BEMHelper from 'app/utils/bem';
import StegID from 'app/types/StegID';
import './steg.less';

const cls = BEMHelper('steg');

export interface StegProps {
    id: StegID;
    history: History;
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
        history,
        children,
    } = props;

    const navigateToPreviousStep = () => {
        if (forrigeStegID) {
            history.push(søknadStegPath(forrigeStegID));
        }
    };

    return (
        <Form className={cls.block}>
            <h1 className={cls.classNames(cls.element('header'), 'blokk-s')}>{id}</h1>
            <div className={cls.classNames(cls.element('navigation'), 'blokk-l')}>
                <BackButton hidden={!forrigeStegID} onClick={navigateToPreviousStep} />
            </div>
            <div className={cls.classNames(cls.element('steginnhold'), 'blokk-l')}>{children}</div>
            <div className={cls.classNames(cls.element('stegkontroller'), 'blokk-m')}>
                {nesteStegID && renderNesteknapp && (
                    <Hovedknapp htmlType="button" onClick={onRequestNavigateToNextStep}>
                        Neste
                    </Hovedknapp>
                )}
                {renderSendeknapp && <Hovedknapp htmlType="submit">Send søknad</Hovedknapp>}
            </div>
            <hr className="blokk-m" />
            <div className={cls.element('avbrytSøknadContainer')}>
                <button type="button" className={cls.classNames(cls.element('avbrytSøknad'), 'lenke')}>
                    <FormattedMessage id="steg.avbrytSøknad" />
                </button>
            </div>
        </Form>
    );
};

export default Steg;
