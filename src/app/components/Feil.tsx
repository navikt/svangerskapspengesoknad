import React, { FunctionComponent } from 'react';
import Block from 'common/components/block/Block';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
    melding: string;
}

const Feil: FunctionComponent<Props & InjectedIntlProps> = ({ melding, intl }) => {
    return (
        <Block margin="l">
            <VeilederMedSnakkeboble
                veileder={{
                    ansikt: 'skeptisk',
                    farge: 'lilla',
                    stil: 'normal'
                }}
                dialog={{
                    title: getMessage(intl, 'feilside.title'),
                    text: melding
                }}
            />
        </Block>
    );
};

export default injectIntl(Feil);
