import { put, all, takeLatest, takeEvery, select } from 'redux-saga/effects';
import {GET_PARCELS, DELETE_PARCEL_CONFIRM} from '../constants/parcels';
import { getParcelsSuccess, getParcelsError, 
        deleteParcelSuccess, deleteParcelError } from '../actions/parcels';
import { logout as logoutAction } from '../actions/auth';
import { getAuthHeader, status } from '../api/api.js';

function* getParcels() {
    try {
        const state = yield select();
        let parcels = [];
        let options = {
            method: 'GET',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/parcels", options)
            .then(response =>
                status(response)
            )
            .then(data => {
                parcels = Object.values(data);
            });
        yield put(getParcelsSuccess(parcels));
    } catch (e){
        yield put(getParcelsError(e));
        yield put(logoutAction(e));
    }
}

function* deleteParcel() {
    const id = yield select(state => state.parcels.parcelToDeleteID);
    try {
        const state = yield select();
        const options = {
            method: 'DELETE',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/parcels/" + id, options,)
            .then(response => {
                if (!response.ok || response.status >= 400)
                    throw Error(response.error);
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