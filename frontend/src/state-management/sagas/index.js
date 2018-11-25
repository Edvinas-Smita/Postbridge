import { all, fork } from 'redux-saga/effects';
import parcelsSaga from './parcels';
import parcelSaga from './parcel';
import parcelStatusHistorySaga from './parcelStatusHistory';

export default function* rootSaga(){
    yield all([
        fork(parcelsSaga),
        fork(parcelSaga),
        fork(parcelStatusHistorySaga),
    ]);
}