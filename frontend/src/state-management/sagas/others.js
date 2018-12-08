import { put, all, takeLatest } from 'redux-saga/effects';
import { GET_LOCATIONS } from '../constants/others';
import { getLocationsError, getLocationsSuccess } from '../actions/others';

function* getLocations() {
    //console.log("getLocations.start");
    try {
        let locations = [];
        /*
        let options = {
            method: 'GET',
            headers: new Headers ({
                'Authorization': `Bearer ${this.state.auth.accessToken}`
            })
        }
        */
        yield fetch("http://localhost:8080/api/locations")
            .then(response => {
                //console.log(response);
                //console.log(response.json());
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