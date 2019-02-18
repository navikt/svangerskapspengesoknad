import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Svangerskapspengesøknad from './connected-components/Svangerskapspengesøknad';
import store from './redux/store';

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <Svangerskapspengesøknad />
    </Provider>,
    rootElement
);
