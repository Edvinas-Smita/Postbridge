import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {  GET_PARCEL, OPEN_PARCEL_STATUS } from '../constants/parcel';
import { getParcelSuccess, getParcelError, getParcel as getParcelAction } from '../actions/parcel';

function* getParcel(action) {
    console.log("saga: getParcel");
    console.log(action);
    try {
        let parcel = {};
        yield fetch("http://localhost:8080/api/parcels/" + action.id)
            .then(response => {
                return response.json();})
            .then(data => {
                parcel = data;
        });
        yield put(getParcelSuccess(parcel));
    } catch (e){
        yield put(getParcelError(e));
    }
}

function* openParcelStatus(action){
    console.log("saga: openParcelStatus");
    console.log(action.id);
    yield put(getParcelAction(action.id));
}

function* parcelsSaga() {
    yield all([
        takeLatest(GET_PARCEL, getParcel),
        takeLatest(OPEN_PARCEL_STATUS, openParcelStatus)
    ]);
}

export default parcelsSaga;