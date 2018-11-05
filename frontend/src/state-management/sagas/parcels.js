import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { GET_PARCELS, DELETE_PARCEL } from '../constants/parcels';
import { getParcelsError, getParcelsSuccess, deleteParcelSuccess, deleteParcelError } from '../actions/parcels';


function* getParcels() {
    try {
        let parcels = [];
        yield fetch("http://localhost:5000/Parcels").then(response => {
            return response.json();
        }).then(data => {
            parcels = Object.values(data);
        });

        yield put(getParcelsSuccess(parcels));
    } catch (e){
        yield put(getParcelsError(e));
    }
}

function* deleteParcel(action) {
    try {
        const { id } = action;
        yield fetch("http://localhost:5000/Parcels/" + id, {
            method: 'delete',
        }).then(response => response.json());

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