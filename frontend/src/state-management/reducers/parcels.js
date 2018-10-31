import {
    INIT_PARCELS,
    INIT_PARCELS_SUCCESS,
    INIT_PARCELS_ERROR, 
} from '../constants/parcels';

const initialState = {
    isLoading: false,
    error: '',
    parcels: [],
};

export default function parcelsReducer(state = initialState, action = {}){
    switch(action.type){
        case INIT_PARCELS: return {
            ...state,
            isLoading: true,
        };
        case INIT_PARCELS_SUCCESS: return {
            ...state,
            isLoading: false,
            parcels: action.parcels,
        };
        case INIT_PARCELS_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        default: return state;
    }
}