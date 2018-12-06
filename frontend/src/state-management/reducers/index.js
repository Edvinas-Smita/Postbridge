import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import parcels from './parcels';
import parcel from './parcel';
import others from './others';
import auth from './auth';

export default combineReducers({
    router: routerReducer,
    parcels,
    parcel,
    others,
    auth
});