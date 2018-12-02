import {EDIT_PARCEL_OPEN, EDIT_PARCEL_SAVE, EDIT_PARCEL_CLOSE} from "../constants/parcelEdit";


export const editParcelOpen = (parcel) => ({
    type: EDIT_PARCEL_OPEN,
    parcel: parcel
});

export const editParcelSave = (parcel) => ({
    type: EDIT_PARCEL_SAVE,
    parcel: parcel
});

export const editParcelClose = (parcel) => ({
    type: EDIT_PARCEL_CLOSE,
    parcel: parcel
});