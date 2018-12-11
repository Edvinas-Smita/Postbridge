import {
  DELETE_PARCEL, DELETE_PARCEL_CANCEL, DELETE_PARCEL_CONFIRM,
  DELETE_PARCEL_ERROR,
  DELETE_PARCEL_SUCCESS,
  GET_PARCELS,
  GET_PARCELS_ERROR,
  GET_PARCELS_SUCCESS,
  NEW_PARCEL,
  SET_PARCEL_FILTER,
  SORT_PARCELS,
  UPDATE_PARCELS
} from '../constants/parcels';

const initialState = {
  isLoading: false,
  error: '',
  parcels: [],
  sortBy: 'createdDate',
  sortOrder: 'desc',
  parcel: {},
  startLocation: '',
  endLocation: '',
  status: [false,
    false,
    false,
    false],
  weightFrom: '',
  weightTo: '',
  createdFrom: '',
  createdTo: '',
  recipient: [],
  courier: [],
  allParcelRecipients: [],
  allParcelCouriers: [],
  statusFilterCounter: 0,
  parcelToDeleteID: null
};

function findParcelIndex(parcels, id) {
  let index = parcels.length;
  if (id !== undefined) index = parcels.findIndex(x => x.id === id);
  return index;
}

function populateWithAllReferencedUsers(intermediateState) {  //pass the state object to populate it with allCouriers and allRecipients fields - use when changing the parcels array
  //there should be checks if intermediateState.parcels is not a valid array
  return {
    ...intermediateState,
    allParcelRecipients: intermediateState.parcels
      .map(parcel => parcel.recipient)  //get all recipients of existing parcels...
      .filter((value, index, self) =>   //...and remove the duplicates
        value && index === self.findIndex(existingValue =>
        existingValue && value.id === existingValue.id
        )
      ),
    allParcelCouriers: intermediateState.parcels
      .map(parcel => parcel.courier)
      .filter((value, index, self) =>
        value && index === self.findIndex(existingValue =>
        existingValue && value.id === existingValue.id
        )
      )
  }
}

export default function parcelsReducer(state = initialState, action = {}) {
  let index;
  switch (action.type) {
    case GET_PARCELS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PARCELS_SUCCESS:
        return populateWithAllReferencedUsers({
          ...state,
          isLoading: false,
          parcels: action.parcels || []
        });
    case GET_PARCELS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case DELETE_PARCEL:
      return {
        ...state,
        parcelToDeleteID: action.id
      };
    case DELETE_PARCEL_CONFIRM:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PARCEL_CANCEL:
      return {
        ...state,
        isLoading: false,
        parcelToDeleteID: null,
        error: ''
      };
    case DELETE_PARCEL_SUCCESS:
      index = findParcelIndex(state.parcels, state.parcelToDeleteID);
      return populateWithAllReferencedUsers({
        ...state,
        isLoading: false,
        parcels: [
          ...state.parcels.slice(0, index),
          ...state.parcels.slice(index + 1),
        ],
        parcelToDeleteID: null
      });
    case DELETE_PARCEL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case UPDATE_PARCELS:
      index = findParcelIndex(state.parcels, action.parcel.id);
      return populateWithAllReferencedUsers({
        ...state,
        parcels: [
          ...state.parcels.slice(0, index),
          action.parcel,
          ...state.parcels.slice(index + 1),
        ]
      });
    case SORT_PARCELS:
      let newOrder = 'asc';
      if (action.sortBy === state.sortBy) newOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      else if (action.sortBy === 'createdDate' || action.sortBy === 'delivered') newOrder = 'desc';

            return {
                ...state,
                sortBy: action.sortBy,
                sortOrder: newOrder,
            };
        case SET_PARCEL_FILTER:

            if (action.filterBy === 'status') {
                let updatedStatus = [...state.status];
                let updatedFilterCounter = state.statusFilterCounter;
                updatedStatus[action.value] = !state.status[action.value];
                updatedStatus[action.value] ? updatedFilterCounter +=1  : updatedFilterCounter -=1;
                return {
                    ...state,
                    status: updatedStatus,
                    statusFilterCounter: updatedFilterCounter
                };
            }
            else {
                return {
                    ...state,
                    [action.filterBy]: action.value,
                };
            }
        case NEW_PARCEL:
            return {
                ...state,
                parcels: [
                    ...state.parcels,
                    action.parcel
                ]
            };default: return state;
    }
}