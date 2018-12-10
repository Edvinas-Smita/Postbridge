import { put, all, takeLatest, takeEvery, take, select } from 'redux-saga/effects';
import { GET_PARCEL, GET_PARCEL_SUCCESS,
        UPDATE_PARCEL, UPDATE_PARCEL_SUCCESS, UPDATE_PARCEL_STATUS, 
        OPEN_PARCEL_STATUS, CLOSE_PARCEL_STATUS,
        GET_PARCEL_STATUS_HISTORY } from '../constants/parcel';
import { getParcelSuccess, getParcelError, getParcel as getParcelAction,
        updateParcel as updateParcelAction,
        updateParcelSuccess, updateParcelError, 
        getParcelStatusHistory as getParcelStatusHistoryAction,
        getParcelStatusHistoryError, getParcelStatusHistorySuccess } from '../actions/parcel';
import { updateParcels as updateParcelsAction} from '../actions/parcels';
import { getAuthHeader, status } from '../api/api.js';

function* openParcelStatus(action) {
    yield put(getParcelAction(action.id));
    yield take(GET_PARCEL_SUCCESS);
    yield put(getParcelStatusHistoryAction(action.id));
}

function* closeParcelStatus(action) {
    yield put(updateParcelsAction(action.parcel));
}

function* getParcel(action) {
    try {
        const state = yield select();
        let parcel = {};
        let options = {
            method: 'GET',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/parcels/" + action.id, options)
            .then(response => 
                status(response)
            )
            .then(data => {
                parcel = data;
            });
        yield put(getParcelSuccess(parcel));
    } catch (e) {
        yield put(getParcelError(e));
    }
}

function* updateParcelStatus(action) {
    yield put(updateParcelAction(action.parcel));
    yield take(UPDATE_PARCEL_SUCCESS);
    yield put(getParcelStatusHistoryAction(action.parcel.id));
}

function* updateParcel(action) {
    try {
        const state = yield select();
        const options = {
            method: 'PUT',
            body: JSON.stringify(action.parcel),
            headers: getAuthHeader(state,
                {'Content-Type': 'application/json'}) 
        }
        yield fetch("http://localhost:8080/api/parcels/" + action.parcel.id, options)
        .then(response => {
            if (!response.ok || response.status >= 400)
                throw Error(response.error);
            });
        
        yield put(updateParcelSuccess(action.parcel));
    } catch (e) {
        yield put(updateParcelError(e));
    }
}

function* getParcelStatusHistory(action) {
    try {
        const state = yield select();
        const { id } = action;
        let parcelStatusHistory = [];
        let options = {
            method: 'GET',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/api/parcels/" + id + "/statusHistory", options)
            .then(response => 
                status(response)
            )
            .then(data => {
                parcelStatusHistory = Object.values(data);
            });
        yield put(getParcelStatusHistorySuccess(parcelStatusHistory));
    } catch (e) {
        yield put(getParcelStatusHistoryError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(GET_PARCEL, getParcel),
        takeEvery(UPDATE_PARCEL, updateParcel),
        takeLatest(OPEN_PARCEL_STATUS, openParcelStatus),
        takeLatest(CLOSE_PARCEL_STATUS, closeParcelStatus),
        takeLatest(GET_PARCEL_STATUS_HISTORY, getParcelStatusHistory),
        takeLatest(UPDATE_PARCEL_STATUS, updateParcelStatus)
    ]);
}

export default parcelsSaga;