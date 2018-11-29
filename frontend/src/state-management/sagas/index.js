import { all, fork } from 'redux-saga/effects';
import parcelsSaga from './parcels';
import parcelStatusHistorySaga from './parcelStatusHistory';
import othersSaga from './others';

export default function* rootSaga(){
    yield all([
        fork(parcelsSaga),
        fork(parcelStatusHistorySaga),
        fork(othersSaga),
    ]);
}