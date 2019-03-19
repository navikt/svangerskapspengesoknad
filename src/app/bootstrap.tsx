import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import countries from 'i18n-iso-countries';
import Modal from 'nav-frontend-modal';
import store from './redux/store';

import IntlProvider from './intl/IntlProvider';
import Svangerskapspengesøknad from './connected-components/svangerskapspengesøknad/Svangerskapspengesøknad';

import './styles/global.less';
import './styles/app.less';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

Modal.setAppElement('#app');
const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <IntlProvider>
            <Normaltekst tag="main">
                <Svangerskapspengesøknad />
            </Normaltekst>
        </IntlProvider>
    </Provider>,
    rootElement
);
