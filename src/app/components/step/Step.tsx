import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import classnames from 'classnames';
import StegIndikator from 'nav-frontend-stegindikator';

import { AppRoute } from 'app/types/Routes';
import { CustomFormikProps } from 'app/types/Formik';
import { FetchStatus } from 'app/types/FetchState';
import { navigateTo } from 'app/utils/navigationUtils';
import {
    parsePathFromLocation,
    finnArbeidsgiversNavn,
    getAllSteps,
    getAdjacentSteps,
    getSøknadStepPath,
} from 'app/utils/stepUtils';
import { State } from 'app/redux/store';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import BackButton from 'common/components/back-button/BackButton';
import BEMHelper from 'app/utils/bem';
import getMessage from 'common/util/i18nUtils';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import ValidationErrorSummary from '../validationErrorSummary/ValidationErrorSummary';
import './step.less';

const cls = BEMHelper('step');

export interface StepProps {
    step: SøknadStep;
    history: History;
    formikProps: CustomFormikProps;
    className?: string;
    showNesteknapp?: boolean;
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = StepProps & StateProps & InjectedIntlProps;

const Step: FunctionComponent<Props> = (props) => {
    const { step, formikProps, history, className, showNesteknapp, arbeidsforhold, intl } = props;

    const allSøknadSteps = getAllSteps(formikProps.values.søknadsgrunnlag);
    const [previousStep, nextStep] = getAdjacentSteps(step, allSøknadSteps);

    const config = {
        step,
        renderNesteknapp: showNesteknapp && nextStep.step !== StepID.INGEN,
        renderSendeknapp: nextStep.step === StepID.INGEN,
        renderTilbakeknapp: previousStep.step !== StepID.INGEN,
        onRequestNavigateToPreviousStep: () => {
            const previousPath = getSøknadStepPath(previousStep.step, previousStep.subStep);
            navigateTo(previousPath, history);
        },
    };

    const currentStep = parsePathFromLocation(history.location);
    const stegForStegIndikator = allSøknadSteps.map((otherStep, index) => {
        return {
            index,
            aktiv: otherStep.step === currentStep.step && otherStep.subStep === currentStep.subStep,
            label:
                otherStep.step === StepID.TILRETTELEGGING && otherStep.subStep
                    ? finnArbeidsgiversNavn(otherStep.subStep, arbeidsforhold)
                    : getMessage(intl, `stegtittel.${otherStep.step}`),
        };
    });

    return (
        <div className={classnames(cls.block, className)}>
            <h1 className={cls.classNames(cls.element('header'), 'blokk-xs')}>
                <FormattedMessage id={`stegtittel.${step.step}`} />
            </h1>
            {currentStep.subStep && (
                <Undertittel className={cls.classNames(cls.element('subHeader'), 'blokk-s')}>
                    {finnArbeidsgiversNavn(currentStep.subStep, arbeidsforhold)}
                </Undertittel>
            )}
            <div className={cls.classNames(cls.element('navigation'), 'blokk-l')}>
                <div>
                    {config.renderTilbakeknapp && (
                        <BackButton
                            text={getMessage(intl, 'steg.tilbake')}
                            hidden={false}
                            onClick={config.onRequestNavigateToPreviousStep}
                        />
                    )}
                </div>
                <StegIndikator kompakt steg={stegForStegIndikator} visLabel={false} />
                <div />
            </div>

            <ValidationErrorSummary />
            <form onSubmit={formikProps.handleSubmit}>
                <div className={cls.classNames(cls.element('steginnhold'))}>{props.children}</div>
                <div className={cls.classNames(cls.element('stegkontroller'), 'blokk-m')}>
                    {config.renderNesteknapp && (
                        <Hovedknapp htmlType="submit">
                            <FormattedMessage id="steg.nesteknapp" />
                        </Hovedknapp>
                    )}
                    {config.renderSendeknapp && (
                        <Hovedknapp htmlType="submit">
                            <FormattedMessage id="oppsummering.sendSøknad" />
                        </Hovedknapp>
                    )}
                </div>
            </form>
            <hr className="blokk-xs" />
            <div className={cls.element('avbrytSøknadContainer')}>
                <button
                    type="button"
                    className={cls.classNames(cls.element('avbrytSøknad'), 'lenke')}
                    onClick={() => {
                        formikProps.handleReset();
                        navigateTo(AppRoute.INTRO, history);
                    }}>
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

export default connect(mapStateToProps)(injectIntl(Step));
