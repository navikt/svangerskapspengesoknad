import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import { CommonActionTypes } from 'app/redux/types/CommonAction';
import { Språkkode } from 'common/types';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Søknadstittel from 'app/components/søknadstittel/Søknadstittel';
import Språkvelger from 'common/components/språkvelger/Språkvelger';

interface OwnProps {
    visSpråkvelger?: boolean;
    visTittel?: boolean;
}

interface StateProps {
    språkkode: Språkkode;
}

interface DispatchProps {
    setSpråk: (språkkode: Språkkode) => void;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

const Applikasjonsside: FunctionComponent<Props> = ({ visSpråkvelger, visTittel, språkkode, setSpråk, children }) => {
    return (
        <React.Fragment>
            {visSpråkvelger && <Språkvelger kode={språkkode} setSpråkkode={setSpråk} />}
            {visTittel && (
                <Søknadstittel>
                    <FormattedMessage id="app.banner" />
                </Søknadstittel>
            )}
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
