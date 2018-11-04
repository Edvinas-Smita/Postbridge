import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import parcels from './parcels';

export default combineReducers({
    router: routerReducer,
    parcels,
});