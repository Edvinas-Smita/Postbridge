import {
  EDIT_PARCEL_CLOSE_EDIT,
  EDIT_PARCEL_CLOSE_REQUEST,
  EDIT_PARCEL_DISCARD,
  EDIT_PARCEL_OPEN,
  EDIT_PARCEL_SAVE_EDIT,
  EDIT_PARCEL_SAVE_REQUEST,
  EDIT_PARCEL_SAVE_REQUEST_ERROR,
  EDIT_PARCEL_SAVE_REQUEST_SUCCESS
} from "../constants/parcelEdit";

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
    case EDIT_PARCEL_SAVE_EDIT:
      return {
        ...state,
        isLoading: true,
        parcel: action.parcel
      };
    case EDIT_PARCEL_CLOSE_EDIT:
      return {
        ...state,
        isLoading: false,
        isOpen: false
      };
    case EDIT_PARCEL_SAVE_REQUEST:
      return {
        ...state,
        isLoading: true,
        parcel: action.parcel
      };
    case EDIT_PARCEL_CLOSE_REQUEST:
      return {
        ...state,
        isLoading: false,
        isOpen: false
      };
    case EDIT_PARCEL_DISCARD:
      return {
        ...state,
        isLoading: false,
        isOpen: false,
        parcel: null
      };
    case EDIT_PARCEL_SAVE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isOpen: false,
        parcel: action.parcel,
        error: ''
      };
    case EDIT_PARCEL_SAVE_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isOpen: false,
        parcel: null,
        error: action.error
      };
    default:
      return state;
  }
}