import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { UferdigSøknad } from 'app/types/Søknad';
import søknad from './reducers/søknadReducer';
import api, { ApiState } from './reducers/apiReducer';
import rootSaga from './sagas';

export interface State {
    søknad: UferdigSøknad;
    api: ApiState;
}

const rootReducer = combineReducers({
    søknad,
    api,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = (initialState?: State) => {
    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
    return createStore(rootReducer, initialState, enhancer);
};

const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store;
