import {
    GET_PARCEL_STATUS_HISTORY,
    GET_PARCEL_STATUS_HISTORY_SUCCESS,
    GET_PARCEL_STATUS_HISTORY_ERROR, 
} from '../constants/parcelStatusHistory';

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