import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { connect as formConnect } from 'formik';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import CheckboksPanelGruppe from 'app/formik/wrappers/CheckboksPanelGruppe';

import { FetchStatus } from 'app/types/FetchState';
import { State } from 'app/redux/store';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Steg, { StegProps } from '../../components/steg/Steg';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';

interface ConnectProps {
    arbeidsforhold: Arbeidsforhold[];
}

type OuterProps = StegProps & ConnectProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Arbeidsforhold: FunctionComponent<Props> = ({ formik, arbeidsforhold, intl, ...stegProps }) => {
    const harValgtMinstEttGrunnlag = formik.values.tilretteleggingsgrunnlag.length > 0;

    return (
        <Steg {...stegProps} renderNesteknapp={harValgtMinstEttGrunnlag}>
            <Block
                header={{
                    title: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.label'),
                    info: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.infotekst'),
                }}>
                <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
            </Block>
            <Block margin="l">
                <CheckboksPanelGruppe
                    name="tilretteleggingsgrunnlag"
                    label={getMessage(intl, 'arbeidsforhold.grunnlag.label')}
                    options={arbeidsforhold.map((forhold) => ({
                        value: forhold.arbeidsgiverId,
                        label: forhold.arbeidsgiverNavn,
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
