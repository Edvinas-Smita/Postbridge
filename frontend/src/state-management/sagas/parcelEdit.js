import {all, put, select, take, takeLatest} from 'redux-saga/effects';
import {UPDATE_PARCEL_SUCCESS} from "../constants/parcel";
import {updateParcel as PUTParcel} from "../actions/parcel";
import {newParcel, updateParcels as refreshParcels} from '../actions/parcels';
import {
  EDIT_PARCEL_CLOSE_EDIT,
  EDIT_PARCEL_CLOSE_REQUEST,
  EDIT_PARCEL_SAVE_EDIT,
  EDIT_PARCEL_SAVE_REQUEST,
  EDIT_PARCEL_SAVE_REQUEST_SUCCESS
} from "../constants/parcelEdit";
import {editParcelSaveError, editParcelSaveSuccess} from "../actions/parcelEdit";

function* editParcelSaveEdit(action) {
  yield put(PUTParcel(action.parcel));
}

function* editParcelCloseEdit() {
  yield take(UPDATE_PARCEL_SUCCESS);
  const updatedParcel = yield select(state => state.parcelEdit.parcel);
  yield put(refreshParcels(updatedParcel));
}

function* editParcelSaveRequest(action) {
  const loggedInUser = yield select(state => {
    return {  //TODO: get the full object from login
      id: state.parcels.userId,
      firstName: 'TODO',
      lastName: 'TODO'
    };
  });

  const parcel = {
    ...action.parcel,
    recipient: loggedInUser,
    courier: {}    //TODO: this needs to be defined due to a bug
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

function* editParcelCloseRequest() {
  yield take(EDIT_PARCEL_SAVE_REQUEST_SUCCESS);
  const createdParcel = yield select(state => state.parcelEdit.parcel);
  yield put(newParcel(createdParcel));
}

function* parcelEditSaga() {
  yield all([
    takeLatest(EDIT_PARCEL_SAVE_EDIT, editParcelSaveEdit),
    takeLatest(EDIT_PARCEL_CLOSE_EDIT, editParcelCloseEdit),
    takeLatest(EDIT_PARCEL_SAVE_REQUEST, editParcelSaveRequest),
    takeLatest(EDIT_PARCEL_CLOSE_REQUEST, editParcelCloseRequest)
  ]);
}

export default parcelEditSaga;