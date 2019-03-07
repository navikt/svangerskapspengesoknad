import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';
import StegIndikator from 'nav-frontend-stegindikator';

import { FetchStatus } from 'app/types/FetchState';
import { parseStepFromHistory, finnArbeidsgiversNavn } from 'app/utils/stepUtils';
import { State } from 'app/redux/store';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import BackButton from 'common/components/back-button/BackButton';
import BEMHelper from 'app/utils/bem';
import getMessage from 'common/util/i18nUtils';
import './steg.less';

const cls = BEMHelper('steg');

export interface StegProps {
    id: StepID;
    history: History;
    renderNesteknapp: boolean;
    renderSendeknapp?: boolean;
    disableNesteknapp?: boolean;
    onRequestNavigateToNextStep?: () => void;
    onRequestNavigateToPreviousStep?: () => void;
    allSøknadSteps: SøknadStep[];
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = StegProps & StateProps & InjectedIntlProps;

const Steg: FunctionComponent<Props> = (props) => {
    const currentStep = parseStepFromHistory(props.history);
    const stegForStegIndikator = props.allSøknadSteps.map((step, index) => {
        return {
            index,
            aktiv: step.step === currentStep.step && step.subStep === currentStep.subStep,
            label:
                step.step === StepID.TILRETTELEGGING && step.subStep
                    ? finnArbeidsgiversNavn(step.subStep, props.arbeidsforhold)
                    : getMessage(props.intl, `stegtittel.${step.step}`),
        };
    });

    return (
        <div className={cls.block}>
            <h1 className={cls.classNames(cls.element('header'), 'blokk-s')}>
                <FormattedMessage
                    id={`stegtittel.${props.id}`}
                    values={{
                        arbeidsgiverLabel: finnArbeidsgiversNavn(currentStep.subStep, props.arbeidsforhold),
                    }}
                />
            </h1>
            <div className={cls.classNames(cls.element('navigation'), 'blokk-l')}>
                <div>
                    {props.onRequestNavigateToPreviousStep && (
                        <BackButton hidden={false} onClick={props.onRequestNavigateToPreviousStep} />
                    )}
                </div>
                <StegIndikator kompakt steg={stegForStegIndikator} visLabel={false} />
                <div />
            </div>
            <div className={cls.classNames(cls.element('steginnhold'))}>{props.children}</div>
            <div className={cls.classNames(cls.element('stegkontroller'), 'blokk-m')}>
                {props.renderNesteknapp && (
                    <Hovedknapp
                        disabled={props.disableNesteknapp}
                        htmlType="button"
                        onClick={props.onRequestNavigateToNextStep}>
                        <FormattedMessage id="steg.nesteknapp" />
                    </Hovedknapp>
                )}
                {props.renderSendeknapp && (
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
        </div>
    );
};

const mapStateToProps = (state: State) => {
    const søkerinfo = state.api.søkerinfo;
    return { arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : undefined };
};

export default connect(mapStateToProps)(injectIntl(Steg));
