import {all, put, take, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  CLOSE_PARCEL_STATUS,
  GET_PARCEL,
  GET_PARCEL_STATUS_HISTORY,
  GET_PARCEL_SUCCESS,
  OPEN_PARCEL_STATUS,
  UPDATE_PARCEL,
  UPDATE_PARCEL_STATUS,
  UPDATE_PARCEL_SUCCESS
} from '../constants/parcel';
import {
  getParcel as getParcelAction,
  getParcelError,
  getParcelStatusHistory as getParcelStatusHistoryAction,
  getParcelStatusHistoryError,
  getParcelStatusHistorySuccess,
  getParcelSuccess,
  updateParcel as updateParcelAction,
  updateParcelError,
  updateParcelSuccess
} from '../actions/parcel';
import {updateParcels as updateParcelsAction} from '../actions/parcels';


function* openParcelStatus(action){
    yield put(getParcelAction(action.id));
    yield take(GET_PARCEL_SUCCESS);
    yield put(getParcelStatusHistoryAction(action.id));
}

function* closeParcelStatus(action){
    yield put(updateParcelsAction(action.parcel));
}

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

function* updateParcelStatus(action) {
   yield put(updateParcelAction(action.parcel));
   yield take(UPDATE_PARCEL_SUCCESS);
   yield put(getParcelStatusHistoryAction(action.parcel.id));
}

function* updateParcel(action) {
  const newParcel = action.parcel;
  if (newParcel.status === 1 && newParcel.courier) { //if it status is open then there shouldn't be a courier
    newParcel.courier = null;
  } else {
    const oldParcel = yield select(state => state.parcels.parcels.find(parcel => parcel.id === newParcel.id));
    if (oldParcel.status === 1) { //if the status changed from open then assign the current user to be the courier
      newParcel.courier = yield select(state => state.others.currentUser);
    }
  }
  try {
    const options = {
      method: 'PUT',
      body: JSON.stringify(newParcel),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    yield fetch("http://localhost:8080/api/parcels/" + newParcel.id, options)
      .then(response => {
        if (response.status >= 400 && response.status < 600)
          throw new Error("Bad response from server");
      });

    yield put(updateParcelSuccess(newParcel));
  } catch (e) {
    yield put(updateParcelError(e));
  }
}

function* getParcelStatusHistory(action) {
    try {

        const { id } = action;
        let parcelStatusHistory = [];
        yield fetch("http://localhost:8080/api/parcels/" + id + "/statusHistory").then(response => {     
            return response.json();
        }).then(data => {
            parcelStatusHistory = Object.values(data);
        });
        yield put(getParcelStatusHistorySuccess(parcelStatusHistory));
    } catch (e){
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