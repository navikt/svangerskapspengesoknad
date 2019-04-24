import React, { FunctionComponent } from 'react';
import Block from 'common/components/block/Block';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
    tittel?: string;
    melding: string | React.ReactNode;
}

const Feil: FunctionComponent<Props & InjectedIntlProps> = ({ tittel = 'feilside.tittel', melding, intl }) => {
    return (
        <Block margin="l">
            <VeilederMedSnakkeboble
                veileder={{
                    ansikt: 'skeptisk',
                    farge: 'lilla',
                    stil: 'normal'
                }}
                dialog={{
                    title: getMessage(intl, tittel),
                    text: melding
                }}
            />
        </Block>
    );
};

export default injectIntl(Feil);
