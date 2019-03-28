import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';

import { dateToHours } from 'app/utils/formatDate';
import { getData } from 'app/utils/fromFetchState';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import BEMHelper from 'app/utils/bem';
import Block from 'common/components/block/Block';
import FetchState from 'app/types/FetchState';
import Kvittering from 'app/types/Kvittering';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import './søknadSendt.less';

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
                        <FormattedMessage
                            id="søknadSendt.tekst"
                            values={{
                                saksNr,
                                dato: dateToHours(new Date(mottattDato)),
                            }}
                        />
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
