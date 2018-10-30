import {
    INIT_PARCELS,
    INIT_PARCELS_SUCCESS,
    INIT_PARCELS_ERROR, 
} from '../constants/parcels';

export const initParcels = () => ({
    type: INIT_PARCELS,
});

export const initParcelsSuccess = parcels => ({
    type: INIT_PARCELS_SUCCESS,
    parcels,
});

export const initParcelsError = error => ({
    type: INIT_PARCELS_ERROR,
    error,
});