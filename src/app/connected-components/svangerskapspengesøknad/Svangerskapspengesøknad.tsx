import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Kjønn, Søkerinfo } from 'app/types/Søkerinfo';
import FetchState, { FetchStatus } from 'app/types/FetchState';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { getData, getErrorCode } from 'app/utils/fromFetchState';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Feil from 'app/components/Feil';
import Kvittering from 'app/types/Kvittering';
import SøknadForm from './SøknadForm';
import SøknadRoutes from './SøknadRoutes';
import Spinner from 'nav-frontend-spinner';

interface Props {
    søkerinfo: FetchState<Søkerinfo>;
    kvittering: FetchState<Kvittering>;
    requestSøkerinfo: () => void;
}

const Svangerskapspengesøknad: React.FunctionComponent<Props> = (props) => {
    const { søkerinfo, kvittering, requestSøkerinfo } = props;

    useEffect(() => {
        if (søkerinfo.status === FetchStatus.UNFETCHED) {
            requestSøkerinfo();
        }

        if (getErrorCode(søkerinfo) === 401) {
            redirectToLogin();
        }
    });

    const redirectToLogin = () => {
        console.warn('Redirecting ...');
        window.location.href = (window as any).LOGIN_URL + '?redirect=' + window.location.href;
    };

    const søker = getData(søkerinfo, {}).søker;
    const isLoading =
        søkerinfo.status !== FetchStatus.SUCCESS ||
        kvittering.status === FetchStatus.IN_PROGRESS ||
        getErrorCode(søkerinfo) === 401;

    if (isLoading) {
        return <Spinner type="XXL" />;
    } else if (søker && søker.kjønn === Kjønn.MANN) {
        return <Feil melding="Menn kan ikke søke om svangerskapspenger" />;
    } else {
        return (
            <SøknadForm>
                <SøknadRoutes harSendtSøknad={kvittering.status !== FetchStatus.UNFETCHED} />
            </SøknadForm>
        );
    }
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
    kvittering: state.api.kvittering,
});

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSøkerinfo: () => {
        dispatch({ type: ApiActionTypes.GET_SØKERINFO_REQUEST });
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Svangerskapspengesøknad);
