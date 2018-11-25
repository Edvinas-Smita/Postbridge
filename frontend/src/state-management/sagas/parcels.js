import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { GET_PARCELS, /*GET_PARCEL,*/ UPDATE_PARCEL, DELETE_PARCEL } from '../constants/parcels';
import { getParcelsSuccess, getParcelsError, 
        //getParcelSuccess, getParcelError, 
        updateParcelSuccess, updateParcelError, 
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
/*
function* getParcel(action) {
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
*/
function* updateParcel(action) {
    try {
        const options = {
            method: 'PUT',
            body: JSON.stringify(action.parcel),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }
        let parcel = {};

        yield fetch("http://localhost:8080/api/parcels/" + action.parcel.id, options)
            .then(response => {
                if(response.status >= 400 && response.status < 600)
                    throw new Error("Bad response from server");
                return response.json();
            })
            .then(data => {
                parcel = data;
            });
        yield put(updateParcelSuccess(parcel));
    } catch(e) {
        yield put(updateParcelError(e));
    }
}

function* deleteParcel(action) {
    try {
        const { id } = action;
        const options = {
            method: 'DELETE'
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
        //takeEvery(GET_PARCEL, getParcel),
        takeEvery(DELETE_PARCEL, deleteParcel),
        takeEvery(UPDATE_PARCEL, updateParcel),
    ]);
}

export default parcelsSaga;