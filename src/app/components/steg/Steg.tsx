import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { connect as formConnect } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';
import StegIndikator from 'nav-frontend-stegindikator';

import { FetchStatus } from 'app/types/FetchState';
import { FormikProps } from 'app/types/Formik';
import { parseStepFromHistory, finnArbeidsgiversNavn } from 'app/utils/stepUtils';
import { State } from 'app/redux/store';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import { UferdigSøknad } from 'app/types/Søknad';
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
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
}

type OuterProps = StegProps & StateProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Steg: FunctionComponent<Props> = (props) => {
    const {
        id,
        renderNesteknapp,
        renderSendeknapp,
        disableNesteknapp,
        onRequestNavigateToNextStep,
        onRequestNavigateToPreviousStep,
        intl,
        formik,
        history,
        children,
        arbeidsforhold,
    } = props;

    const currentStep = parseStepFromHistory(history);
    const translateStatiskSteg = (stepID: StepID) => getMessage(intl, `stegtittel.${stepID}`);

    const fromArbeidsgiverIdToStepAndLabel = (arbeidsgiverId: string) => {
        const arbeidsgiverLabel = finnArbeidsgiversNavn(arbeidsgiverId, arbeidsforhold);
        return {
            steg: {
                step: StepID.TILRETTELEGGING,
                subStep: arbeidsgiverId,
            },
            label: getMessage(intl, 'stegtittel.tilrettelegging', {
                arbeidsgiverLabel,
            }),
        };
    };

    const createPropsForStegIndikator = ({ steg, label }: { steg: SøknadStep; label: string }, index: number) => ({
        index,
        label,
        aktiv: steg.step === currentStep.step && steg.subStep === currentStep.subStep,
    });

    const stegForStegIndikator = [
        { steg: { step: StepID.TERMIN }, label: translateStatiskSteg(StepID.TERMIN) },
        { steg: { step: StepID.ARBEIDSFORHOLD }, label: translateStatiskSteg(StepID.ARBEIDSFORHOLD) },
        ...formik.values.søknadsgrunnlag.map(fromArbeidsgiverIdToStepAndLabel),
        { steg: { step: StepID.OPPSUMMERING }, label: translateStatiskSteg(StepID.OPPSUMMERING) },
    ].map(createPropsForStegIndikator);

    return (
        <div className={cls.block}>
            <h1 className={cls.classNames(cls.element('header'), 'blokk-s')}>
                <FormattedMessage
                    id={`stegtittel.${id}`}
                    values={{
                        arbeidsgiverLabel: finnArbeidsgiversNavn(currentStep.subStep, arbeidsforhold),
                    }}
                />
            </h1>
            <div className={cls.classNames(cls.element('navigation'), 'blokk-l')}>
                <div>
                    {onRequestNavigateToPreviousStep && (
                        <BackButton hidden={false} onClick={onRequestNavigateToPreviousStep} />
                    )}
                </div>
                <StegIndikator kompakt steg={stegForStegIndikator} visLabel={false} />
                <div />
            </div>
            <div className={cls.classNames(cls.element('steginnhold'))}>{children}</div>
            <div className={cls.classNames(cls.element('stegkontroller'), 'blokk-m')}>
                {renderNesteknapp && (
                    <Hovedknapp disabled={disableNesteknapp} htmlType="button" onClick={onRequestNavigateToNextStep}>
                        <FormattedMessage id="steg.nesteknapp" />
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
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    arbeidsforhold:
        state.api.søkerinfo.status === FetchStatus.SUCCESS ? state.api.søkerinfo.data.arbeidsforhold : undefined,
});

export default connect(mapStateToProps)(injectIntl(formConnect<OuterProps, UferdigSøknad>(Steg)));
