import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { State } from 'app/redux/store';
import FetchState from 'app/types/FetchState';
import Kvittering from 'app/types/Kvittering';
import { getData } from 'app/utils/fromFetchState';
import { dateToHours } from 'app/utils/formatDate';

interface Props {
    kvittering: FetchState<Kvittering>;
}

const SøknadSendt: FunctionComponent<Props> = ({ kvittering }) => {
    const { mottattDato, saksNr } = getData(kvittering, {});

    return (
        <div>
            Takk! Søknad med saksnummer {saksNr} ble sendt {dateToHours(new Date(mottattDato))}.
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
    kvittering: state.api.kvittering,
});

export default connect(mapStateToProps)(SøknadSendt);
