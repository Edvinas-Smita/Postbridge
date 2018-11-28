import { put, all, takeLatest } from 'redux-saga/effects';
import { GET_LOCATIONS } from '../constants/others';
import { getLocationsError, getLocationsSuccess } from '../actions/others';

function* getLocations() {
    try {
        let locations = [];
        yield fetch("http://localhost:8080/api/locations").then(response => {
            return response.json();
        }).then(data => {
            locations = Object.values(data);
        });

        yield put(getLocationsSuccess(locations));
    } catch (e){
        yield put(getLocationsError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(GET_LOCATIONS, getLocations)
    ]);
}

export default parcelsSaga;