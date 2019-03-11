import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { connect as formConnect } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';

import { FormikProps } from 'app/types/Formik';
import { getData } from 'app/utils/fromFetchState';
import { HistoryProps } from 'app/redux/types/common';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import Applikasjonsside from 'app/connected-components/applikasjonsside/Applikasjonsside';
import BekreftCheckboksPanel from 'app/formik/wrappers/BekreftCheckboksPanel';
import BEMHelper from 'app/utils/bem';
import FetchState from 'app/types/FetchState';
import getMessage from 'common/util/i18nUtils';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';
import './intro.less';
import { UferdigSøknad } from 'app/types/Søknad';

const cls = BEMHelper('intro');

interface OwnProps {
    søkerinfo: FetchState<Søkerinfo>;
}

type OuterProps = OwnProps & InjectedIntlProps & HistoryProps;
type Props = OuterProps & FormikProps;

const Intro: FunctionComponent<Props> = ({ søkerinfo, intl, formik, history }) => {
    const søker = getData(søkerinfo, {}).søker;
    const disableNextButton = !formik.values.harGodkjentVilkår;
    const startSøknad = () => {
        history.push('/soknad');
    };

    return (
        <Applikasjonsside visSpråkvelger={true}>
            <VeilederMedSnakkeboble
                dialog={{
                    title: getMessage(intl, 'intro.bobletittel', {
                        name: søker.fornavn.slice(0, 1).concat(søker.fornavn.slice(1).toLowerCase()),
                    }),
                    text: getMessage(intl, 'intro.bobletekst'),
                }}
            />
            <div className={cls.block}>
                <Innholdstittel className="blokk-xs">
                    <FormattedMessage id="intro.tittel" />
                </Innholdstittel>
                <Ingress className="blokk-l">
                    <FormattedMessage id="intro.ingress" />
                </Ingress>
                <BekreftCheckboksPanel
                    className="blokk-m"
                    name="harGodkjentVilkår"
                    label={getMessage(intl, 'intro.godkjennVilkår.bekreft')}>
                    <FormattedMessage id="intro.godkjennVilkår.label" />
                </BekreftCheckboksPanel>
                <Hovedknapp onClick={startSøknad} htmlType="button" disabled={disableNextButton}>
                    <FormattedMessage id="intro.begynnSøknad.knapp" />
                </Hovedknapp>
            </div>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
});

export default connect(mapStateToProps)(injectIntl(formConnect<OuterProps, UferdigSøknad>(Intro)));
