import {
    GET_LOCATIONS,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_ERROR, 
} from '../constants/others';

export const getLocations = () => ({
    type: GET_LOCATIONS,
});

export const getLocationsSuccess = locations => ({
    type: GET_LOCATIONS_SUCCESS,
    locations,
});

export const getLocationsError = error => ({
    type: GET_LOCATIONS_ERROR,
    error,
});
