import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { getData } from 'app/utils/fromFetchState';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { mockedSøknad } from 'app/redux/reducers/søknadReducer';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import BEMHelper from 'app/utils/bem';
import FetchState from 'app/types/FetchState';
import Søknad from 'app/types/Søknad';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';
import './intro.less';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

const cls = BEMHelper('intro');

interface OwnProps {
    søkerinfo: FetchState<Søkerinfo>;
    requestSendSøknad: (søknad: Søknad) => void;
}

type Props = OwnProps & InjectedIntlProps;

const Intro: FunctionComponent<Props> = ({ søkerinfo, requestSendSøknad, intl }) => {
    const onClick = () => {
        requestSendSøknad(mockedSøknad);
    };

    const søker = getData(søkerinfo, {}).søker;

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
                <Hovedknapp onClick={onClick}>
                    <FormattedMessage id="intro.begynnSøknad.knapp" />
                </Hovedknapp>
            </main>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
});

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSendSøknad: () => {
        dispatch({ type: ApiActionTypes.SEND_SØKNAD_REQUEST, payload: { søknad: mockedSøknad } });
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Intro));
