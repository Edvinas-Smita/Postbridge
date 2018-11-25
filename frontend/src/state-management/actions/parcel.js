import {
    GET_PARCEL,
    GET_PARCEL_SUCCESS,
    GET_PARCEL_ERROR,
    OPEN_PARCEL_STATUS,
    CLOSE_PARCEL_STATUS
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

export const openParcelStatus = (id) => ({
    type: OPEN_PARCEL_STATUS,
    id
});

export const closeParcelStatus = () => ({
    type: CLOSE_PARCEL_STATUS
});