import React from 'react';
import dayjs from 'dayjs';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import SvangerskapspengerContextProvider from './context/SvangerskapspengerContextProvider';
import Svangerskapspenger from './Svangerskapspenger';
import IntlProvider from './common-components/IntlProvider';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);

    return (
        <SvangerskapspengerContextProvider>
            <IntlProvider språkkode={locale}>
                <Svangerskapspenger
                    locale={locale}
                    onChangeLocale={(activeLocale: Locale) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                    }}
                />
            </IntlProvider>
        </SvangerskapspengerContextProvider>
    );
};

export default AppContainer;
