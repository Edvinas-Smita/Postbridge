import { put, all, takeLatest, take, select } from 'redux-saga/effects';
import { LOGIN, AUTH, LOGOUT, GET_USER_DETAILS, AUTH_SUCCESS } from '../constants/auth';
import { auth as authAction, authSuccess, authError,
     getUserDetailsSuccess, getUserDetailsError, 
     logoutSuccess, logoutError, 
     getUserDetails as getUserDetailsAction } from '../actions/auth';
import { getAuthHeader, status } from '../api/api.js';

function* auth(action){
    let credentials = action.credentials;
    try {
        const body = 
            "username=" + credentials.email + "&" +
            "password=" + credentials.password + "&" +
            "client_id=parcel-app-client&" +
            "grant_type=password";

        const options = {
            method: 'POST',
            body: body,
            headers: new Headers ({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + window.btoa('parcel-app-client:parcel-app-secret')
            })
        }

        let accessToken;

        yield fetch("http://localhost:8080/oauth/token", options)
            .then(response => 
                status(response)
            )
            .then(data => {
                accessToken = data.access_token;
        });

        yield put(authSuccess(accessToken));
    }
    catch(e) {
        yield put(authError(e));
    }  
}

function* login(action) {
    yield put(authAction(action.credentials));
    yield take(AUTH_SUCCESS);
    yield put(getUserDetailsAction());
}

function* getUserDetails() {
    try {
        const state = yield select();
        let user = {};
        let options = {
            method: 'GET',
            headers: getAuthHeader(state)
        }
        yield fetch("http://localhost:8080/oauth/user-details", options)
            .then(response => 
                status(response)
            )
            .then(data => {
                user = data;
            });
        yield put(getUserDetailsSuccess(user));
    }
    catch(e) {
        yield put(getUserDetailsError(e));
    }
}

function* logout(action) {
    try {
        yield fetch("http://localhost:8080/oauth/revoke-token")
            .then(response => 
                status(response)
            );

    yield put(logoutSuccess());
    }
    catch(e) {
        yield put(logoutError(e));
    }
}

function* authSaga() {
    yield all([
        takeLatest(AUTH, auth),
        takeLatest(LOGIN, login),
        takeLatest(LOGOUT, logout),
        takeLatest(GET_USER_DETAILS, getUserDetails)
    ]);
}

export default authSaga;