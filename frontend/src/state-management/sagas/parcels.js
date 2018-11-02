import { put, all, takeLatest } from 'redux-saga/effects';
import { INIT_PARCELS } from '../constants/parcels';
import { initParcelsError, initParcelsSuccess } from '../actions/parcels';


function* initParcels() {
    try {
        let parcels = [];
        yield fetch("http://localhost:5000/Parcels").then(response => {
            return response.json();
        }).then(data => {
            parcels = Object.values(data);
        });

        yield put(initParcelsSuccess(parcels));
    } catch (e){
        yield put(initParcelsError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(INIT_PARCELS, initParcels),
    ]);
}

export default parcelsSaga;