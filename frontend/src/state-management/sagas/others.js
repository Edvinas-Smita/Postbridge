import { put, all, takeLatest, select } from 'redux-saga/effects';
import { GET_LOCATIONS } from '../constants/others';
import { getLocationsError, getLocationsSuccess } from '../actions/others';
import { getAuthHeader } from '../../helpers.js'

function* getLocations() {
    try {
        const state = yield select();
        let locations = [];
        let options = {
            method: 'GET',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/locations", options)
            .then(response => {
                return response.json();})
            .then(data => {
                locations = Object.values(data);
            });
        yield put(getLocationsSuccess(locations));
    } catch (e) {
        yield put(getLocationsError(e));
    }
}

function* othersSaga() {
    yield all([
        takeLatest(GET_LOCATIONS, getLocations)
    ]);
}

export default othersSaga;