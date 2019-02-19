import { all } from 'redux-saga/effects';
import apiSaga from './apiSaga';

function* rootSaga() {
    yield all([apiSaga()]);
}

export default rootSaga;
