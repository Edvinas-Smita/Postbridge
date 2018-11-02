import {
    GET_PARCELS,
    GET_PARCELS_SUCCESS,
    GET_PARCELS_ERROR, 
} from '../constants/parcels';

const initialState = {
    isLoading: false,
    error: '',
    parcels: [],
};

export default function parcelsReducer(state = initialState, action = {}){
    switch(action.type){
        case GET_PARCELS: return {
            ...state,
            isLoading: true,
        };
        case GET_PARCELS_SUCCESS: return {
            ...state,
            isLoading: false,
            parcels: action.parcels,
        };
        case GET_PARCELS_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        default: return state;
    }
}