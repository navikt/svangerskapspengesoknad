import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Svangerskapspengesøknad from './connected-components/svangerskapspengesøknad/Svangerskapspengesøknad';
import IntlProvider from './intl/IntlProvider';
import { Normaltekst } from 'nav-frontend-typografi';

import './styles/global.less';

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <IntlProvider>
            <Normaltekst tag="div">
                <Svangerskapspengesøknad />
            </Normaltekst>
        </IntlProvider>
    </Provider>,
    rootElement
);
