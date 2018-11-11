import {
    GET_PARCEL_STATUS_HISTORY,
    GET_PARCEL_STATUS_HISTORY_SUCCESS,
    GET_PARCEL_STATUS_HISTORY_ERROR, 
} from '../constants/parcelStatusHistory';

const initialState = {
    isLoading: false,
    error: '',
    parcelStatusHistory: [],
};

export default function parcelStatusHistoryReducer(state = initialState, action = {}){
    switch(action.type){
        case GET_PARCEL_STATUS_HISTORY: return {
            ...state,
            isLoading: true,
        };
        case GET_PARCEL_STATUS_HISTORY_SUCCESS: return {
            ...state,
            isLoading: false,
            parcels: action.parcelStatusHistory,
        };
        case GET_PARCEL_STATUS_HISTORY_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        default: return state;
    }
}