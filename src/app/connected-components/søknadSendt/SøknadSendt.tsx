import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { State } from 'app/redux/store';
import FetchState from 'app/types/FetchState';
import Kvittering from 'app/types/Kvittering';
import { getData } from 'app/utils/fromFetchState';
import { dateToHours } from 'app/utils/formatDate';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import BEMHelper from 'app/utils/bem';
import './søknadSendt.less';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

const cls = BEMHelper('søknadSendt');

interface Props {
    kvittering: FetchState<Kvittering>;
    søkerinfo: FetchState<Søkerinfo>;
}

const SøknadSendt: FunctionComponent<Props> = ({ kvittering, søkerinfo }) => {
    const { mottattDato, saksNr } = getData(kvittering, {});
    const { søker } = getData(søkerinfo, {});

    return (
        <Applikasjonsside visTittel={true}>
            <div className={cls.block}>
                <Block margin="m">
                    <SpotlightLetter className={cls.element('spotlightLetter')} />
                </Block>

                <Block>
                    <Innholdstittel>
                        <FormattedMessage
                            id="søknadSendt.tittel"
                            values={{
                                name: søker.fornavn,
                            }}
                        />
                    </Innholdstittel>
                </Block>
                <Block>
                    <Ingress>
                        Søknad med saksnummer {saksNr} ble sendt {dateToHours(new Date(mottattDato))}.
                    </Ingress>
                </Block>
                <Block>
                    <Hovedknapp
                        className={cls.element('avsluttKnapp')}
                        onClick={() => ((window as any).location = 'https://tjenester.nav.no/dittnav/oversikt')}>
                        <FormattedMessage id="avslutt" />
                    </Hovedknapp>
                </Block>
            </div>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
    kvittering: state.api.kvittering,
});

export default connect(mapStateToProps)(SøknadSendt);
