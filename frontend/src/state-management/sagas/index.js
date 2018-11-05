import { all, fork } from 'redux-saga/effects';
import parcelsSaga from './parcels';

export default function* rootSaga(){
    yield all([
        fork(parcelsSaga),
    ]);
}