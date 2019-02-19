import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import { Søkerinfo, Kjønn } from 'app/types/Søkerinfo';
import Feil from 'app/components/Feil';
import Intro from '../intro/Intro';
import Søknad from '../søknad/Søknad';
import SøknadSendt from '../søknadSendt/SøknadSendt';
import { ApiActionTypes } from 'app/redux/types/ApiAction';
import FetchState, { FetchStatus } from 'app/types/FetchState';
import { getErrorCode, getData } from 'app/utils/fromFetchState';
import Kvittering from 'app/types/Kvittering';

interface Props {
    søkerinfo: FetchState<Søkerinfo>;
    kvittering: FetchState<Kvittering>;
    harGodkjentVilkår: boolean;
    requestSøkerinfo: () => void;
}

const Svangerskapspengesøknad: React.FunctionComponent<Props> = (props) => {
    const { søkerinfo, kvittering, requestSøkerinfo, harGodkjentVilkår } = props;

    useEffect(() => {
        if (søkerinfo.status === FetchStatus.UNFETCHED) {
            requestSøkerinfo();
        }

        if (getErrorCode(søkerinfo) === 401) {
            redirectToLogin();
        }
    });

    const redirectToLogin = () => {
        window.location.href = (window as any).LOGIN_URL + '?redirect=' + window.location.href;
    };

    const renderRoutes = (routes: JSX.Element | JSX.Element[]) => {
        return (
            <Switch>
                {routes}
                <Redirect to="/svangerskapspenger" />
            </Switch>
        );
    };

    const getSøknadRoutes = () => {
        const routes = [];

        if (kvittering.status === FetchStatus.UNFETCHED) {
            routes.push(<Route path="/svangerskapspenger" component={Intro} exact={true} key="intro" />);

            if (harGodkjentVilkår) {
                routes.push(<Route path="/svangerskapspenger/soknad" component={Søknad} key="søknad" />);
            }
        } else {
            routes.push(<Route path="/svangerskapspenger" component={SøknadSendt} exact={true} key="completed" />);
        }

        return renderRoutes(routes);
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
        return getSøknadRoutes();
    }
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
    kvittering: state.api.kvittering,
    harGodkjentVilkår: state.søknad.harGodkjentVilkår,
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
