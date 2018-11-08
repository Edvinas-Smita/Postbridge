import { put, all, takeLatest } from 'redux-saga/effects';
import { GET_PARCELS } from '../constants/parcels';
import { getParcelsError, getParcelsSuccess } from '../actions/parcels';


function* getParcels() {
    try {
        let parcels = [];
        yield fetch("http://localhost:8080/api/parcels").then(response => {
            return response.json();
        }).then(data => {
            parcels = Object.values(data);
        });

        yield put(getParcelsSuccess(parcels));
    } catch (e){
        yield put(getParcelsError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(GET_PARCELS, getParcels),
    ]);
}

export default parcelsSaga;