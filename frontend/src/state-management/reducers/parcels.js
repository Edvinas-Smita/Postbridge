import {
    INIT_PARCELS,
    INIT_PARCELS_SUCCESS,
    INIT_PARCELS_ERROR, 
} from '../constants/parcels';

const initialState = {
    isLoading: false,
    error: '',
    parcels: [
        { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.5kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
        { fromPoint: 'Vilnius', toPoint: 'London', status: 'Picked up', description: 'Electronic goods', weight: '3kg', created: '21.09.2018', delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
        { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 'Delivered', description: 'Home appliances', weight: '2.85kg', created: '21.09.2018', delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
        { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 'On the way', description: 'Electronic goods', weight: '0.5kg', created: '21.09.2018', delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'},
        { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.25kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
        { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.5kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
        { fromPoint: 'Vilnius', toPoint: 'London', status: 'Picked up', description: 'Electronic goods', weight: '3kg', created: '21.09.2018', delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
        { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 'Delivered', description: 'Home appliances', weight: '2.85kg', created: '21.09.2018', delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
        { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 'On the way', description: 'Electronic goods', weight: '0.5kg', created: '21.09.2018', delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'},
    ],
};

export default function parcelsReducer(state = initialState, action = {}){
    switch(action.type){
        case INIT_PARCELS: return {
            ...state,
            isLoading: true,
        };
        case INIT_PARCELS_SUCCESS: return {
            ...state,
            isLoading: false,
            parcels: action.parcels,
        };
        case INIT_PARCELS_ERROR: return {
            ...state,
            isLoading: false,
            error: action.error,
        };
        default: return state;
    }
}