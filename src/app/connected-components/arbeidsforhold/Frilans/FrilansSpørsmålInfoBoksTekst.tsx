import React from 'react';
import { FormattedMessage } from 'react-intl';
import { generateLink } from '../../../components/componentsUtils/componentsUtils';

const FrilansSpørsmålInfoBoksTekst = () => {
    return (
        <>
            <FormattedMessage id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.title" />
            <ul>
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt1" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt2" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt3" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt4" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt5" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt6" />
                <FormattedMessage tagName="li" id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.liste.punkt7" />
            </ul>
            <FormattedMessage
                id="arbeidsforhold.frilans.erFrilanser.infoboksTekst.link"
                values={{
                    a: (msg: any) =>
                        generateLink(
                            msg,
                            'https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/veiledning/arbeidsforholdet/type-arbeidsforhold/frilanser-oppdragstaker-og-personer-som-mottar-honorarer '
                        ),
                }}
            />
        </>
    );
};
export default FrilansSpørsmålInfoBoksTekst;
