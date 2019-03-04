import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import StegIndikator from 'nav-frontend-stegindikator';

import { SØKNADSSTEG } from 'app/utils/stegUtils';
import { State } from 'app/redux/store';
import BackButton from 'common/components/back-button/BackButton';
import BEMHelper from 'app/utils/bem';
import getMessage from 'common/util/i18nUtils';
import StegID from 'app/types/StegID';
import './steg.less';

const cls = BEMHelper('steg');

export interface StegProps {
    id: StegID;
    history: History;
    renderNesteknapp?: boolean;
    renderSendeknapp?: boolean;
    onRequestNavigateToNextStep?: () => void;
    onRequestNavigateToPreviousStep?: () => void;
}

interface StateProps {
    currentSteg: StegID;
}

type Props = StegProps & StateProps & InjectedIntlProps;

const Steg: FunctionComponent<Props> = (props) => {
    const {
        id,
        currentSteg,
        renderNesteknapp,
        renderSendeknapp,
        onRequestNavigateToNextStep,
        onRequestNavigateToPreviousStep,
        intl,
        children,
    } = props;

    const stegForStegIndikator: StegindikatorStegProps[] = SØKNADSSTEG.map((steg, index) => ({
        index,
        label: getMessage(intl, `stegindikator.label.${steg}`),
        aktiv: steg === currentSteg,
    }));

    return (
        <Form className={cls.block}>
            <h1 className={cls.classNames(cls.element('header'), 'blokk-s')}>{id}</h1>
            <div className={cls.classNames(cls.element('navigation'), 'blokk-l')}>
                <div>
                    {onRequestNavigateToPreviousStep && (
                        <BackButton hidden={false} onClick={onRequestNavigateToPreviousStep} />
                    )}
                </div>
                <StegIndikator kompakt steg={stegForStegIndikator} visLabel={false} />
                <div />
            </div>
            <div className={cls.classNames(cls.element('steginnhold'), 'blokk-l')}>{children}</div>
            <div className={cls.classNames(cls.element('stegkontroller'), 'blokk-m')}>
                {renderNesteknapp && (
                    <Hovedknapp htmlType="button" onClick={onRequestNavigateToNextStep}>
                        Neste
                    </Hovedknapp>
                )}
                {renderSendeknapp && (
                    <Hovedknapp htmlType="submit">
                        <FormattedMessage id="oppsummering.sendSøknad" />
                    </Hovedknapp>
                )}
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

const mapStateToProps = (state: State) => ({
    currentSteg: state.common.steg,
});

export default connect(mapStateToProps)(injectIntl(Steg));
