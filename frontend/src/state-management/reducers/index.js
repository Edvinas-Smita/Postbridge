import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import parcels from './parcels';
import parcel from './parcel';

export default combineReducers({
    router: routerReducer,
    parcels,
    parcel
});