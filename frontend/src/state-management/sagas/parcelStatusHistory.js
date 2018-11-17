import { put, all, takeLatest } from 'redux-saga/effects';
import { GET_PARCEL_STATUS_HISTORY } from '../constants/parcelStatusHistory';
import { getParcelStatusHistoryError, getParcelStatusHistorySuccess } from '../actions/parcelStatusHistory';

function* getParcelStatusHistory(action) {
    try {

        const { id } = action;
        let parcelStatusHistory = [];
        yield fetch("http://localhost:8080/api/parcels/" + id + "/statusHistory").then(response => {     
            return response.json();
        }).then(data => {
            parcelStatusHistory = Object.values(data);
        });
        yield put(getParcelStatusHistorySuccess(parcelStatusHistory));
    } catch (e){
        yield put(getParcelStatusHistoryError(e));
    }
}

function* parcelStatusHistorySaga() {
    yield all([
        takeLatest(GET_PARCEL_STATUS_HISTORY, getParcelStatusHistory)
    ]);
}

export default parcelStatusHistorySaga;