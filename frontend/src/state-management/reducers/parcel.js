import {
    GET_PARCEL,
    GET_PARCEL_SUCCESS,
    GET_PARCEL_ERROR,
    OPEN_PARCEL_STATUS,
    CLOSE_PARCEL_STATUS,
} from '../constants/parcel';

//import { getParcel } from '../../state-management/sagas/parcel';

const initialState = {
    isLoading: false,
    error: '',
    parcel: {},
    isStatusOpen: false,
    id: null
};

export default function parcelReducer(state = initialState, action = {}){
    console.log("parcelReducers");
    console.log(action);
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
        default: return state;
    }
}