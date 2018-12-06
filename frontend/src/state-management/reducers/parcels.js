import {
  DELETE_PARCEL,
  DELETE_PARCEL_ERROR,
  DELETE_PARCEL_SUCCESS,
  GET_PARCELS,
  GET_PARCELS_ERROR,
  GET_PARCELS_SUCCESS,
  SET_PARCEL_FILTER,
  SORT_PARCELS,
  UPDATE_PARCELS,
} from '../constants/parcels';

const initialState = {
  isLoading: false,
  error: '',
  parcels: [],
  allParcelRecipients: [],
  allParcelCouriers: [],
  sortBy: 'createdDate',
  sortOrder: 'desc',
  parcel: {},
  filterBy: '',
  filteredParcels: [],
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
  courier: [],
  userId: 1,
  statusFilterCounter: 0
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
        isLoading: true,
      };
    case DELETE_PARCEL_SUCCESS:
      index = findParcelIndex(state.parcels, action.id);
      return populateWithAllReferencedUsers({
        ...state,
        isLoading: false,
        parcels: [
          ...state.parcels.slice(0, index),
          ...state.parcels.slice(index + 1),
        ],
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
        let updatedFilterCouter = state.statusFilterCounter;
        updatedStatus[action.value] = !state.status[action.value];
        updatedStatus[action.value] ? updatedFilterCouter += 1 : updatedFilterCouter -= 1
        return {
          ...state,
          status: updatedStatus,
          statusFilterCounter: updatedFilterCouter,
        };
      }
      else {
        return {
          ...state,
          [action.filterBy]: action.value,
        };
      }
    default:
      return state;
  }
}