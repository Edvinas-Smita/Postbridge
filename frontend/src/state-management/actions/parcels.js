import {
    GET_PARCELS,
    GET_PARCELS_SUCCESS,
    GET_PARCELS_ERROR, 
    UPDATE_PARCELS,
    DELETE_PARCEL,
    DELETE_PARCEL_SUCCESS,
    DELETE_PARCEL_ERROR, 
    SORT_PARCELS,
    SET_PARCEL_FILTER,
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

export const updateParcels = parcel => ({
    type: UPDATE_PARCELS,
    parcel,
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
});

export const setParcelFilter = (filterBy, value) => ({
    type: SET_PARCEL_FILTER,
    filterBy,
    value
})
