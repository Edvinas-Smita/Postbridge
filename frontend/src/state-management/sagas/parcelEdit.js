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

function* editParcelSaveEdit(action) {
  yield put(PUTParcel(action.parcel));
  yield take(UPDATE_PARCEL_SUCCESS);
  const updatedParcel = yield select(state => state.parcelEdit.parcel);
  yield put(refreshParcels(updatedParcel));
  yield put(editParcelClose());
}

function* editParcelSaveRequest(action) {
  const loggedInUser = yield select(state => state.others.currentUser);

  const parcel = {
    ...action.parcel,
    recipient: loggedInUser
  };

  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(parcel),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    let actualParcel = {};
    yield fetch("http://localhost:8080/api/parcels", options)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
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