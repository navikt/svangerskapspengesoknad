import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Språkkode } from 'common/types';
import { connect } from 'react-redux';
import Språkvelger from 'common/components/språkvelger/Språkvelger';
import Action from 'app/redux/types/Action';
import { CommonActionTypes } from 'app/redux/types/CommonAction';
import { State } from 'app/redux/store';

interface OwnProps {
    visSpråkvelger?: boolean;
}

interface StateProps {
    språkkode: Språkkode;
}

interface DispatchProps {
    setSpråk: (språkkode: Språkkode) => void;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

const Applikasjonsside: FunctionComponent<Props> = ({ visSpråkvelger, språkkode, setSpråk, children }) => {
    return (
        <React.Fragment>
            {visSpråkvelger && <Språkvelger kode={språkkode} setSpråkkode={setSpråk} />}
            {children}
        </React.Fragment>
    );
};

const mapStateToProps = (state: State): StateProps => ({
    språkkode: state.common.språkkode,
});

const mapDispatchToProps = (dispatch: (action: Action) => void): DispatchProps => ({
    setSpråk: (språkkode: Språkkode) => dispatch({ type: CommonActionTypes.SET_SPRÅK, payload: { språkkode } }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Applikasjonsside));
