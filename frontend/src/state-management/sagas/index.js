import { all, fork } from 'redux-saga/effects';
import parcelsSaga from './parcels';
import parcelSaga from './parcel';
import othersSaga from './others';
import authSaga from './auth';

export default function* rootSaga(){
    yield all([
        fork(parcelsSaga),
        fork(parcelSaga),
        fork(othersSaga),
        fork(authSaga),
    ]);
}