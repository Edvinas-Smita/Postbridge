import { put, all, takeLatest, takeEvery, select } from 'redux-saga/effects';
import {GET_PARCELS, DELETE_PARCEL_CONFIRM} from '../constants/parcels';
import { getParcelsSuccess, getParcelsError, 
        deleteParcelSuccess, deleteParcelError } from '../actions/parcels';

function* getParcels() {
    try {
        let parcels = [];
        yield fetch("http://localhost:8080/api/parcels")
            .then(response => {
                return response.json();})
            .then(data => {
                parcels = Object.values(data);
        });
        yield put(getParcelsSuccess(parcels));
    } catch (e){
        yield put(getParcelsError(e));
    }
}

function* deleteParcel() {
    const id = yield select(state => state.parcels.parcelToDeleteID);
    try {
        const options = {
            method: 'DELETE'
        }
        yield fetch("http://localhost:8080/api/parcels/" + id, options,)
            .then(response => {
                if(response.status >= 400 && response.status < 600)
                    throw new Error("Bad response from server");
        });

        yield put(deleteParcelSuccess());
    } catch(e) {
        yield put(deleteParcelError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(GET_PARCELS, getParcels),
        takeEvery(DELETE_PARCEL_CONFIRM, deleteParcel),
    ]);
}

export default parcelsSaga;