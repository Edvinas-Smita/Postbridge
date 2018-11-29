import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import parcels from './parcels';
import parcelStatusHistory from './parcelStatusHistory';
import others from './others';

export default combineReducers({
    router: routerReducer,
    parcels,
    parcelStatusHistory,
    others
});