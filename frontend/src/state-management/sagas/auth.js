import { put, all, takeLatest, take } from 'redux-saga/effects';
import { SIGN_IN, SIGN_IN_SUCCESS } from '../constants/auth';
import { signInSuccess, signInError, loggedIn } from '../actions/auth';

function* signIn(action) {
    try {
        const body = 
            "username=" + action.credentials.email + "&" +
            "password=" + action.credentials.password + "&" +
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
            .then(response => {
                if(response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                accessToken = data.access_token;
        });

        yield put(signInSuccess(accessToken));
        yield take(SIGN_IN_SUCCESS);
        yield put(loggedIn());
    }
    catch(e) {
        yield put(signInError(e));
    }
}

function* authSaga() {
    yield all([
        takeLatest(SIGN_IN, signIn)
    ]);
}

export default authSaga;