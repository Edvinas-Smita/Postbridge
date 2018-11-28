import {
    GET_PARCEL,
    GET_PARCEL_SUCCESS,
    GET_PARCEL_ERROR,
    UPDATE_PARCEL,
    UPDATE_PARCEL_SUCCESS,
    UPDATE_PARCEL_ERROR,
    UPDATE_PARCEL_STATUS, 
    OPEN_PARCEL_STATUS,
    CLOSE_PARCEL_STATUS,
    GET_PARCEL_STATUS_HISTORY,
    GET_PARCEL_STATUS_HISTORY_SUCCESS,
    GET_PARCEL_STATUS_HISTORY_ERROR, 
} from '../constants/parcel';

const initialState = {
    isLoading: false,
    error: '',
    parcel: {},
    isStatusOpen: false,
    ParcelId: null,
    statusHistory: []
};

export default function parcelReducer(state = initialState, action = {}){
    switch(action.type){
        case GET_PARCEL: return {
            ...state,
            isLoading: true,
        };
        case GET_PARCEL_SUCCESS: return {
            ...state,
            isLoading: false,
            parcel: action.parcel,
        };
        case GET_PARCEL_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        case UPDATE_PARCEL: return {
            ...state,
            isLoading: true,
        };
        case UPDATE_PARCEL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                parcel: action.parcel,
            };
        case UPDATE_PARCEL_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        case UPDATE_PARCEL_STATUS: return {
            ...state,
            isLoading: true,
        };
        case OPEN_PARCEL_STATUS: return {
            ...state,
            isStatusOpen: true,
            isLoading: true,
            parcelId: action.id
        }
        case CLOSE_PARCEL_STATUS: return {
            ...state,
            isStatusOpen: false,
            parcelId: null,
            parcel: null
        }
        case GET_PARCEL_STATUS_HISTORY: return {
            ...state,
            isLoading: true,
        };
        case GET_PARCEL_STATUS_HISTORY_SUCCESS: return {
            ...state,
            isLoading: false,
            statusHistory: action.parcelStatusHistory,
        };
        case GET_PARCEL_STATUS_HISTORY_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
            history: []
        };
        default: return state;
    }
}