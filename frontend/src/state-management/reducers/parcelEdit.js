import {EDIT_PARCEL_OPEN, EDIT_PARCEL_SAVE, EDIT_PARCEL_CLOSE} from "../constants/parcelEdit";

const initialState = {
    isLoading: false,
    error: '',
    isOpen: false,
    parcel: null
};

export default function parcelEditReducer(state = initialState, action = {}) {
    switch (action.type) {
        case EDIT_PARCEL_OPEN:
            return {
                ...state,
                isLoading: false,
                parcel: action.parcel,
                isOpen: true
            };
        case EDIT_PARCEL_SAVE:
            return {
                ...state,
                isLoading: true,
                parcel: action.parcel,
            };
        case EDIT_PARCEL_CLOSE:
            return {
                ...state,
                isLoading: false,
                parcel: action.parcel,
                isOpen: false
            };
        default:
            return state;
    }
}