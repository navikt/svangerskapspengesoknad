import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';

import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { CustomFormikProps } from 'app/types/Formik';
import { FetchStatus } from 'app/types/FetchState';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { mergeSøknadsgrunnlagIntoTilrettelegging } from 'app/utils/tilretteleggingUtils';
import { navigateTo } from 'app/utils/navigationUtils';
import { State } from 'app/redux/store';
import { StepProps } from '../../components/step/Step';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import FormikStep from 'app/components/formikStep/FormikStep';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import VelgSøknadsgrunnlag from 'app/formik/wrappers/VelgSøknadsgrunnlag';
import './arbeidsforhold.less';

const cls = BEMHelper('arbeidsforhold');

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

interface ConnectProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = OwnProps & StepProps & ConnectProps & InjectedIntlProps;

const Arbeidsforhold: FunctionComponent<Props> = (props) => {
    const { step, formikProps, arbeidsforhold, intl, history } = props;
    const { values, setFieldValue } = formikProps;
    const harValgtMinstEttGrunnlag = values.søknadsgrunnlag.length > 0;

    const prepareTilrettelegging = () => {
        setFieldValue(
            'tilrettelegging',
            mergeSøknadsgrunnlagIntoTilrettelegging(values.søknadsgrunnlag, values.tilrettelegging)
        );
    };

    const navigate = () => {
        prepareTilrettelegging();

        const pathToFirstTilrettelegging = getSøknadStepPath(StepID.TILRETTELEGGING, values.søknadsgrunnlag[0].id);
        navigateTo(pathToFirstTilrettelegging, history);
    };

    return (
        <Applikasjonsside visTittel visSpråkvelger>
            <FormikStep
                step={step}
                className={cls.block}
                formikProps={formikProps}
                showNesteknapp={harValgtMinstEttGrunnlag}
                onValidFormSubmit={navigate}
                history={history}>
                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.label'),
                    }}>
                    <Normaltekst>{getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.text')}</Normaltekst>
                </Block>
                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.label'),
                        info: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.infotekst'),
                    }}>
                    <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
                </Block>
                <Block margin="s">
                    <Veilederinfo type="info" stil="kompakt">
                        {getMessage(intl, 'arbeidsforhold.veileder.inntektsmelding', {
                            // TODO: Hva er riktig dato her?
                            datoTidligst: moment().format('DD.MM.YYYY'),
                        })}
                    </Veilederinfo>
                </Block>
                <Block margin="l">
                    <VelgSøknadsgrunnlag
                        name="søknadsgrunnlag"
                        label={getMessage(intl, 'arbeidsforhold.grunnlag.label')}
                        options={arbeidsforhold.map((forhold) => ({
                            value: forhold.arbeidsgiverId,
                            label: forhold.arbeidsgiverNavn,
                            type: Arbeidsforholdstype.VIRKSOMHET,
                        }))}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const { søkerinfo } = state.api;

    return {
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : [],
    };
};

export default injectIntl(connect(mapStateToProps)(Arbeidsforhold));
