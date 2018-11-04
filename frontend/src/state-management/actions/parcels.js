import {
    GET_PARCELS,
    GET_PARCELS_SUCCESS,
    GET_PARCELS_ERROR, 
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

export const sortParcels = sortBy => ({
    type: SORT_PARCELS,
    sortBy,
})