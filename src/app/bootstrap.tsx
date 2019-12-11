import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import countries from 'i18n-iso-countries';
import Modal from 'nav-frontend-modal';
import * as Sentry from '@sentry/browser';

import store from './redux/store';
import IntlProvider from './intl/IntlProvider';
import Svangerskapspengesøknad from './connected-components/svangerskapspengesøknad/Svangerskapspengesøknad';

import './styles/global.less';
import './styles/app.less';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

Modal.setAppElement('#app');
const rootElement = document.getElementById('app');

Sentry.init({
    dsn: 'https://b28b752e32e846dd9818f2eb7a9fc013@sentry.gc.nav.no/7',
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })]
});

render(
    <ErrorBoundary>
        <Provider store={store}>
            <IntlProvider>
                <Normaltekst tag="main">
                    <Svangerskapspengesøknad />
                </Normaltekst>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>,
    rootElement
);
