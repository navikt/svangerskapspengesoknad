import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { connect as formConnect } from 'formik';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { FetchStatus } from 'app/types/FetchState';
import { State } from 'app/redux/store';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Steg, { StegProps } from '../../components/steg/Steg';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import VelgSøknadsgrunnlag from 'app/formik/wrappers/VelgSøknadsgrunnlag';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { mapGrunnlagTilTilrettelegging } from 'app/utils/tilretteleggingUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import './arbeidsforhold.less';
import BEMHelper from 'app/utils/bem';

const cls = BEMHelper('arbeidsforhold');

interface ConnectProps {
    arbeidsforhold: Arbeidsforhold[];
}

type OuterProps = StegProps & ConnectProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Arbeidsforhold: FunctionComponent<Props> = ({ formik, arbeidsforhold, intl, ...stegProps }) => {
    const harValgtMinstEttGrunnlag = formik.values.søknadsgrunnlag.length > 0;

    const prepareNextStep = () => {
        if (stegProps.onRequestNavigateToNextStep) {
            const tilrettelegging = mapGrunnlagTilTilrettelegging(formik.values.søknadsgrunnlag);
            formik.setFieldValue('tilrettelegging', tilrettelegging);
            stegProps.onRequestNavigateToNextStep();
        }
    };

    return (
        <Steg
            {...stegProps}
            className={cls.block}
            renderNesteknapp={harValgtMinstEttGrunnlag}
            onRequestNavigateToNextStep={prepareNextStep}>
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
                    {getMessage(intl, 'arbeidsforhold.veileder.inntektsmelding')}
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
        </Steg>
    );
};

const mapStateToProps = (state: State) => {
    const { søkerinfo } = state.api;

    return {
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : [],
    };
};

export default injectIntl(connect(mapStateToProps)(formConnect<OuterProps, UferdigSøknad>(Arbeidsforhold)));
