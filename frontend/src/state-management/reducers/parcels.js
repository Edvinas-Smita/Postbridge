import {
    GET_PARCELS,
    GET_PARCELS_SUCCESS,
    GET_PARCELS_ERROR, 
    DELETE_PARCEL,
    DELETE_PARCEL_SUCCESS,
    DELETE_PARCEL_ERROR, 
    SORT_PARCELS,
} from '../constants/parcels';

const initialState = {
    isLoading: false,
    error: '',
    parcels: [],
    sortBy: 'createdDate',
    sortOrder: 'desc',
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
        case DELETE_PARCEL: return {
            ...state,
            isLoading: true,
        };
        case DELETE_PARCEL_SUCCESS: 
            let index = state.parcels.findIndex(x => x.id === action.id);
            return {
                ...state,
                isLoading: false,
                parcels: [
                    ...state.parcels.slice(0, index),
                    ...state.parcels.slice(index + 1),
                ],
            };
        case DELETE_PARCEL_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        case SORT_PARCELS: 
            let newOrder = 'asc';
            if(action.sortBy === state.sortBy) newOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
            else if(action.sortBy === 'createdDate' || action.sortBy === 'delivered') newOrder = 'desc';

            return {
                ...state,
                sortBy: action.sortBy,
                sortOrder: newOrder,
            }
        default: return state;
    }
}