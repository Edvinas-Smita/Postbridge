import {
    EDIT_PARCEL_CLOSE_EDIT,
    EDIT_PARCEL_CLOSE_REQUEST,
    EDIT_PARCEL_DISCARD,
    EDIT_PARCEL_OPEN,
    EDIT_PARCEL_SAVE_EDIT,
    EDIT_PARCEL_SAVE_REQUEST, EDIT_PARCEL_SAVE_REQUEST_ERROR, EDIT_PARCEL_SAVE_REQUEST_SUCCESS
} from "../constants/parcelEdit";


export const editParcelOpen = (parcel) => ({
    type: EDIT_PARCEL_OPEN,
    parcel: parcel
});

export const editParcelSaveEdit = (parcel) => ({
    type: EDIT_PARCEL_SAVE_EDIT,
    parcel: parcel
});

export const editParcelCloseEdit = (parcel) => ({
    type: EDIT_PARCEL_CLOSE_EDIT,
    parcel: parcel
});

export const editParcelSaveRequest = (parcel) => ({
    type: EDIT_PARCEL_SAVE_REQUEST,
    parcel: parcel
});

export const editParcelCloseRequest = () => ({
    type: EDIT_PARCEL_CLOSE_REQUEST
});

export const editParcelCloseDiscard = () => ({
    type: EDIT_PARCEL_DISCARD
});

export const editParcelSaveSuccess = (parcel) => ({
    type: EDIT_PARCEL_SAVE_REQUEST_SUCCESS,
    parcel
});

export const editParcelSaveError = (error) => ({
    type: EDIT_PARCEL_SAVE_REQUEST_ERROR,
    error
});
