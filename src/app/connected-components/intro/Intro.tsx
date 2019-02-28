import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { connect as formConnect } from 'formik';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';

import { FormikProps } from 'app/types/Formik';
import { getData } from 'app/utils/fromFetchState';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import Applikasjonsside from 'app/connected-components/applikasjonsside/Applikasjonsside';
import BekreftCheckboksPanel from 'app/formik/wrappers/BekreftCheckboksPanel';
import BEMHelper from 'app/utils/bem';
import FetchState from 'app/types/FetchState';
import getMessage from 'common/util/i18nUtils';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';
import { HistoryProps } from 'app/redux/types/common';
import './intro.less';

const cls = BEMHelper('intro');

interface OwnProps {
    søkerinfo: FetchState<Søkerinfo>;
}

type Props = OwnProps & InjectedIntlProps & FormikProps & HistoryProps;

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
            <main className={cls.className}>
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
            </main>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
});

export default connect(mapStateToProps)(formConnect(injectIntl(Intro)));
