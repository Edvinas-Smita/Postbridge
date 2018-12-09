import {
    GET_PARCEL,
    GET_PARCEL_SUCCESS,
    GET_PARCEL_ERROR,
    UPDATE_PARCEL,
    UPDATE_PARCEL_SUCCESS,
    UPDATE_PARCEL_ERROR,
    UPDATE_PARCEL_STATUS,
    OPEN_PARCEL_STATUS,
    CLOSE_PARCEL_STATUS,
    GET_PARCEL_STATUS_HISTORY,
    GET_PARCEL_STATUS_HISTORY_SUCCESS,
    GET_PARCEL_STATUS_HISTORY_ERROR
} from '../constants/parcel';

export const getParcel = (id) => ({
    type: GET_PARCEL,
    id
});

export const getParcelSuccess = parcel => ({
    type: GET_PARCEL_SUCCESS,
    parcel,
});

export const getParcelError = error => ({
    type: GET_PARCEL_ERROR,
    error,
});

export const updateParcel = parcel => ({
    type: UPDATE_PARCEL,
    parcel,
});

export const updateParcelStatus = parcel => ({
    type: UPDATE_PARCEL_STATUS,
    parcel,
});

export const updateParcelSuccess = parcel => ({
    type: UPDATE_PARCEL_SUCCESS,
    parcel,
});

export const updateParcelError = error => ({
    type: UPDATE_PARCEL_ERROR,
    error,
});

export const openParcelStatus = (id) => ({
    type: OPEN_PARCEL_STATUS,
    id
});

export const closeParcelStatus = (parcel) => ({
    type: CLOSE_PARCEL_STATUS,
    parcel
});

export const getParcelStatusHistory = id => ({
    type: GET_PARCEL_STATUS_HISTORY,
    id,
});

export const getParcelStatusHistorySuccess = parcelStatusHistory => ({
    type: GET_PARCEL_STATUS_HISTORY_SUCCESS,
    parcelStatusHistory,
});

export const getParcelStatusHistoryError = error => ({
    type: GET_PARCEL_STATUS_HISTORY_ERROR,
    error,
});
