import { put, all, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { GET_PARCELS, DELETE_PARCEL } from '../constants/parcels';
import { getParcelsSuccess, getParcelsError, 
        deleteParcelSuccess, deleteParcelError } from '../actions/parcels';
import { getAuthHeader } from '../../helpers.js'

function* getParcels() {
    try {
        const state = yield select();
        let parcels = [];
        let options = {
            method: 'GET',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/parcels", options)
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

function* deleteParcel(action) {
    try {
        const state = yield select();
        const { id } = action;
        const options = {
            method: 'DELETE',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/parcels/" + id, options,)
            .then(response => {
                if(response.status >= 400 && response.status < 600)
                    throw new Error("Bad response from server");
        });

        yield put(deleteParcelSuccess(id));
    } catch(e) {
        yield put(deleteParcelError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(GET_PARCELS, getParcels),
        takeEvery(DELETE_PARCEL, deleteParcel),
    ]);
}

export default parcelsSaga;