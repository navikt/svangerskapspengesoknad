import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { getData } from 'app/utils/fromFetchState';
import { Undertittel } from 'nav-frontend-typografi';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import FetchState from 'app/types/FetchState';
import Kvittering from 'app/types/Kvittering';
import Panel from 'nav-frontend-paneler';
import './søknadSendt.less';
import StatusBoks from './components/StatusBoks';
import Lenke from 'nav-frontend-lenker';
import KvitteringHeader from './components/KvitteringHeader';
import { FormattedMessage } from 'react-intl';
import KvitteringSuksess from './components/KvitteringSuksess';
import BEMHelper from 'common/util/bem';
import HvorLengeIkon from 'app/icons/HvorLenge';

const cls = BEMHelper('søknadSendt');

interface Props {
    kvittering: FetchState<Kvittering>;
    søkerinfo: FetchState<Søkerinfo>;
}

const SøknadSendt: FunctionComponent<Props> = ({ kvittering, søkerinfo }) => {
    const { mottattDato, pdf, saksNr } = getData(kvittering, {});
    const { søker } = getData(søkerinfo, {});

    return (
        <Applikasjonsside visTittel={true}>
            <div className={cls.block}>
                <KvitteringHeader søker={søker} mottattDato={mottattDato} pdf={pdf} />

                <KvitteringSuksess />

                <StatusBoks saksNr={saksNr} />

                <Block>
                    <Undertittel className={cls.element('tittel')}>
                        <FormattedMessage id="søknadSendt.foreldrepenger" />
                    </Undertittel>
                </Block>

                <Block>
                    <Panel className={cls.element('foreldrepengerPanel')}>
                        <div>
                            <Block margin="xxs">
                                <Undertittel>
                                    <FormattedMessage id="søknadSendt.foreldrepenger.boks.tittel" />
                                </Undertittel>
                            </Block>
                            <Block margin="xs">
                                <FormattedMessage id="søknadSendt.foreldrepenger.boks.innhold" />
                            </Block>
                            <Lenke href="https://foreldrepengeplanlegger.nav.no/" target="_blank">
                                <FormattedMessage id="søknadSendt.foreldrepenger.boks.lenke" />
                            </Lenke>
                        </div>
                        <div className={cls.element('ikon')}>
                            <HvorLengeIkon />
                        </div>
                    </Panel>
                </Block>
            </div>
            ;
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
    kvittering: state.api.kvittering,
});

export default connect(mapStateToProps)(SøknadSendt);
