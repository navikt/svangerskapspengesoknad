import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import { CommonActionTypes } from 'app/redux/types/CommonAction';
import { Språkkode } from 'common/types';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Søknadstittel from 'app/components/søknadstittel/Søknadstittel';
// import Språkvelger from 'common/components/språkvelger/Språkvelger';
import { Normaltekst } from 'nav-frontend-typografi';

import './../../../common/components/språkvelger/språkvelger.less'; // Fjern når nynorsk er på plass

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
        <>
            <DocumentTitle title="Svangerskapspengesøknad" />
            {/* {visSpråkvelger && <Språkvelger kode={språkkode} setSpråkkode={setSpråk} />} */}
            {visSpråkvelger && (
                <div className="sprakvelger">
                    <Normaltekst>Nynorsk versjon av søknaden er under arbeid</Normaltekst>
                </div>
            )}
            {visTittel && (
                <Søknadstittel>
                    <FormattedMessage id="app.banner" />
                </Søknadstittel>
            )}
            {children}
        </>
    );
};

const mapStateToProps = (state: State): StateProps => ({
    språkkode: state.common.språkkode
});

const mapDispatchToProps = (dispatch: (action: Action) => void): DispatchProps => ({
    setSpråk: (språkkode: Språkkode) => dispatch({ type: CommonActionTypes.SET_SPRÅK, payload: { språkkode } })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Applikasjonsside));
