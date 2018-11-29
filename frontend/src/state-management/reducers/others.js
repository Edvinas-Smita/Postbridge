import {
    GET_LOCATIONS,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_ERROR, 
} from '../constants/others';

const initialState = {
    locations: [],
    isLoading: false,
};

export default function othersReducer(state = initialState, action = {}){
    switch(action.type){
        case GET_LOCATIONS: return {
            ...state,
            isLoading: true,
        };
        case GET_LOCATIONS_SUCCESS: return {
            ...state,
            isLoading: false,
            locations: action.locations,
        };
        case GET_LOCATIONS_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        default: return state;
    }
}