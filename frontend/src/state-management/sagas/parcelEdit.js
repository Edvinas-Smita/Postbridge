import {all, put, take, takeLatest} from 'redux-saga/effects';
import {UPDATE_PARCEL_SUCCESS} from "../constants/parcel";
import {updateParcel as PUTParcel} from "../actions/parcel";
import {updateParcels as refreshParcels} from '../actions/parcels';
import {EDIT_PARCEL_CLOSE, EDIT_PARCEL_SAVE} from "../constants/parcelEdit";

function* editParcelSave(action) {
    yield put(PUTParcel(action.parcel));
    yield take(UPDATE_PARCEL_SUCCESS);
}

function* editParcelClose(action) {
    yield put(refreshParcels(action.parcel))
}

function* parcelEditSaga() {
    yield all([
        takeLatest(EDIT_PARCEL_SAVE, editParcelSave),
        takeLatest(EDIT_PARCEL_CLOSE, editParcelClose)
    ]);
}

export default parcelEditSaga;