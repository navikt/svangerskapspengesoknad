import React, { FunctionComponent } from 'react';
import { mockedSøknad } from 'app/redux/reducers/søknadReducer';
import Action from 'app/redux/types/Action';
import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { connect } from 'react-redux';
import Søknad from 'app/types/Søknad';
import FetchState from 'app/types/FetchState';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import { getData } from 'app/utils/fromFetchState';

interface Props {
    søkerinfo: FetchState<Søkerinfo>;
    requestSendSøknad: (søknad: Søknad) => void;
}

const Intro: FunctionComponent<Props> = ({ søkerinfo, requestSendSøknad }) => {
    const onClick = () => {
        requestSendSøknad(mockedSøknad);
    };

    const søker = getData(søkerinfo, {}).søker;

    return (
        <>
            <p>Hei, {søker && søker.fornavn}, og velkommen til svangerskapspengesøknaden!</p>
            <button onClick={onClick}>Send søknad</button>
        </>
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
)(Intro);
