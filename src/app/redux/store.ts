import { combineReducers, createStore } from 'redux';
import { UferdigSøknad } from 'app/types/Søknad';
import søknad from './reducers/søknadReducer';
import api, { ApiState } from './reducers/apiReducer';

export interface State {
    søknad: UferdigSøknad;
    api: ApiState;
}

const rootReducer = combineReducers({
    søknad,
    api,
});

const store = createStore(
    rootReducer,
    // tslint:disable-next-line no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    // middleware
);

export default store;
