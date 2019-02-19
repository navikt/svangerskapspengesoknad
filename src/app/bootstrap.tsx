import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Svangerskapspengesøknad from './connected-components/svangerskapspengesøknad/Svangerskapspengesøknad';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <Router>
            <Svangerskapspengesøknad />
        </Router>
    </Provider>,
    rootElement
);
