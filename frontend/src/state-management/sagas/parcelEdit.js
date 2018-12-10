import {all, put, select, take, takeLatest} from 'redux-saga/effects';
import {UPDATE_PARCEL_SUCCESS} from "../constants/parcel";
import {updateParcel as PUTParcel, updateParcelError} from "../actions/parcel";
import {newParcel, updateParcels as refreshParcels} from '../actions/parcels';
import {
  EDIT_PARCEL_DISCARD,
  EDIT_PARCEL_SAVE_EDIT,
  EDIT_PARCEL_SAVE_REQUEST,
  EDIT_PARCEL_SAVE_REQUEST_SUCCESS
} from "../constants/parcelEdit";
import {
  editParcelClose,
  editParcelSaveError,
  editParcelSaveSuccess
} from "../actions/parcelEdit";
import { getAuthHeader, status } from '../api/api.js';

function* editParcelSaveEdit(action) {
  yield put(PUTParcel(action.parcel));
  yield take(UPDATE_PARCEL_SUCCESS);
  const updatedParcel = yield select(state => state.parcelEdit.parcel);
  yield put(refreshParcels(updatedParcel));
  yield put(editParcelClose());
}

function* editParcelSaveRequest(action) {
  const loggedInUser = yield select(state => {
    return {  
      id: state.parcels.userId,//TODO: put userId to redux
      firstName: state.auth.user.firstName,
      lastName: state.auth.user.lastName
    };
  });

  const parcel = {
    ...action.parcel,
    recipient: loggedInUser
  };

  try {
    const state = yield select();
    const options = {
      method: 'POST',
      body: JSON.stringify(parcel),
      headers: getAuthHeader(state,
        {'Content-Type': 'application/json'})
    };

    let actualParcel = {};
    yield fetch("http://localhost:8080/api/parcels", options)
      .then(response => status(response))
      .then(data => (actualParcel = data));

    yield put(editParcelSaveSuccess(actualParcel));
  } catch (e) {
    yield put(editParcelSaveError(e));
  }
}

function *editParcelFinalizeRequest() {
  const createdParcel = yield select(state => state.parcelEdit.parcel);
  yield put(newParcel(createdParcel));
  yield put(editParcelClose());
}

function *editParcelDiscard() {
  yield put(updateParcelError(''));
}

function* parcelEditSaga() {
  yield all([
    takeLatest(EDIT_PARCEL_SAVE_EDIT, editParcelSaveEdit),
    takeLatest(EDIT_PARCEL_SAVE_REQUEST, editParcelSaveRequest),
    takeLatest(EDIT_PARCEL_SAVE_REQUEST_SUCCESS, editParcelFinalizeRequest),
    takeLatest(EDIT_PARCEL_DISCARD, editParcelDiscard)
  ]);
}

export default parcelEditSaga;