import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './redux/store';

import IntlProvider from './intl/IntlProvider';
import Svangerskapspengesøknad from './connected-components/svangerskapspengesøknad/Svangerskapspengesøknad';

import './styles/global.less';
import './styles/app.less';

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
