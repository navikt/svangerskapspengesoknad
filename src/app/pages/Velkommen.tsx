import { Block, intlUtils, LanguageToggle, Locale, Sidebanner } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();

    return (
        <div>
            <LanguageToggle
                locale={locale}
                availableLocales={['nb', 'nn']}
                toggle={(loc: Locale) => onChangeLocale(loc)}
            />
            <Sidebanner
                dialog={{
                    title: intlUtils(intl, 'velkommen.standard.bobletittel', { name: 'test' }),
                    text: (
                        <>
                            <Block padBottom="m">
                                <FormattedMessage id={'velkommen.standard.bobletekst.del1'} />
                            </Block>
                            <Block>
                                <FormattedMessage id={'velkommen.standard.bobletekst.del2'} />
                            </Block>
                        </>
                    ),
                }}
            />
        </div>
    );
};

export default Velkommen;
