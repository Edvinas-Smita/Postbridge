import { put, all, takeLatest } from 'redux-saga/effects';
import { INIT_PARCELS } from '../constants/parcels';
import { initParcelsError, initParcelsSuccess } from '../actions/parcels';


function* initParcels() {
    try {
        const parcels = [
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.5kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Vilnius', toPoint: 'London', status: 'Picked up', description: 'Electronic goods', weight: '3kg', created: '21.09.2018', delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
            { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 'Delivered', description: 'Home appliances', weight: '2.85kg', created: '21.09.2018', delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
            { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 'On the way', description: 'Electronic goods', weight: '0.5kg', created: '21.09.2018', delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'},
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.25kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Toronto', toPoint: 'Kaunas', status: 'Open', description: 'Books', weight: '1.5kg', created: '21.09.2018', delivered: '', recipient: 'me', courier: 'Arthur Jameson'},
            { fromPoint: 'Vilnius', toPoint: 'London', status: 'Picked up', description: 'Electronic goods', weight: '3kg', created: '21.09.2018', delivered: '', recipient: 'Patrick Strongwell', courier: 'Monica Wilde'},
            { fromPoint: 'Chicago', toPoint: 'Kaunas', status: 'Delivered', description: 'Home appliances', weight: '2.85kg', created: '21.09.2018', delivered: '21.09.2018', recipient: 'Vytautas Stankevicius', courier: 'Matt Cox'},
            { fromPoint: 'Kaunas', toPoint: 'Vilnius', status: 'On the way', description: 'Electronic goods', weight: '0.5kg', created: '21.09.2018', delivered: '', recipient: 'Lindsay Smith', courier: 'Carolyne James'},
        ];
        yield put(initParcelsSuccess(parcels));
    } catch (e){
        yield put(initParcelsError(e));
    }
}

function* parcelsSaga() {
    yield all([
        takeLatest(INIT_PARCELS, initParcels),
    ]);
}

export default parcelsSaga;