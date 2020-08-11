import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import UtvidetInformasjon from '../utvidet-informasjon/UtvidetInformasjon';

const InfoTilFiskere = () => {
    return (
        <UtvidetInformasjon apneLabel="Er du fisker? Les hvordan du skal fylle ut søknaden">
            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del1" />
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.hyre" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del2" />
                </Block>
                <Block margin="xs">
                    <FormattedHTMLMessage
                        id="andreInntekter.infoTilFiskere.del3"
                        values={{
                            link:
                                'https://www.nav.no/no/bedrift/tjenester-og-skjemaer/nav-og-altinn-tjenester/foreldrepenger-og-svangerskapspenger2',
                        }}
                    />
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lott" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del4" />
                </Block>
                <Block margin="xs">
                    <FormattedHTMLMessage
                        id="andreInntekter.infoTilFiskere.del5"
                        values={{
                            link:
                                'https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/2019/fiske/F-14.014/F-14.048/',
                        }}
                    />
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.egenBåt" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del6" />
                </Block>
                <Undertittel>
                    <FormattedMessage id="andreInntekter.infoTilFiskere.lottOgHyre" />
                </Undertittel>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del7" />
                </Block>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del8" />
                </Block>
                <Block margin="xs">
                    <FormattedMessage id="andreInntekter.infoTilFiskere.del9" />
                </Block>
                <Block margin="none">
                    <FormattedHTMLMessage
                        id="andreInntekter.infoTilFiskere.del5"
                        values={{
                            link:
                                'https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/2019/fiske/F-14.014/F-14.048/',
                        }}
                    />
                </Block>
            </div>
        </UtvidetInformasjon>
    );
};

export default InfoTilFiskere;
