import {
    GET_PARCELS,
    GET_PARCELS_SUCCESS,
    GET_PARCELS_ERROR, 
    DELETE_PARCEL,
    DELETE_PARCEL_SUCCESS,
    UPDATE_PARCEL_ERROR, 
    UPDATE_PARCEL,
    UPDATE_PARCEL_SUCCESS,
    DELETE_PARCEL_ERROR, 
    SORT_PARCELS,
} from '../constants/parcels';

export const getParcels = () => ({
    type: GET_PARCELS,
});

export const getParcelsSuccess = parcels => ({
    type: GET_PARCELS_SUCCESS,
    parcels,
});

export const getParcelsError = error => ({
    type: GET_PARCELS_ERROR,
    error,
});

export const updateParcel = parcel => ({
    type: UPDATE_PARCEL,
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

export const deleteParcel = id => ({
    type: DELETE_PARCEL,
    id,
});

export const deleteParcelSuccess = id => ({
    type: DELETE_PARCEL_SUCCESS,
    id,
});

export const deleteParcelError = error => ({
    type: DELETE_PARCEL_ERROR,
    error,
});

export const sortParcels = sortBy => ({
    type: SORT_PARCELS,
    sortBy,
})