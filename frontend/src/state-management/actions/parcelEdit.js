import {
  EDIT_PARCEL_CLOSE,
  EDIT_PARCEL_DISCARD,
  EDIT_PARCEL_OPEN,
  EDIT_PARCEL_SAVE_EDIT,
  EDIT_PARCEL_SAVE_REQUEST,
  EDIT_PARCEL_SAVE_REQUEST_ERROR,
  EDIT_PARCEL_SAVE_REQUEST_SUCCESS
} from "../constants/parcelEdit";


export const editParcelOpen = (parcel) => ({
  type: EDIT_PARCEL_OPEN,
  parcel
});

export const editParcelSaveEdit = (parcel) => ({
  type: EDIT_PARCEL_SAVE_EDIT,
  parcel
});

export const editParcelClose = () => ({
  type: EDIT_PARCEL_CLOSE
});

export const editParcelSaveRequest = (parcel) => ({
  type: EDIT_PARCEL_SAVE_REQUEST,
  parcel
});

export const editParcelCloseDiscard = () => ({
  type: EDIT_PARCEL_DISCARD
});

export const editParcelSaveSuccess = (parcel) => ({
  type: EDIT_PARCEL_SAVE_REQUEST_SUCCESS,
  parcel
});

export const editParcelSaveError = (error) => ({
  type: EDIT_PARCEL_SAVE_REQUEST_ERROR,
  error
});
