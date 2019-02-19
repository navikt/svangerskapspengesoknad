import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Svangerskapspengesøknad from './connected-components/svangerskapspengesøknad/Svangerskapspengesøknad';
import { BrowserRouter as Router } from 'react-router-dom';
import IntlProvider from './intl/IntlProvider';

import './styles/global.less';

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <IntlProvider>
            <Router>
                <Svangerskapspengesøknad />
            </Router>
        </IntlProvider>
    </Provider>,
    rootElement
);
