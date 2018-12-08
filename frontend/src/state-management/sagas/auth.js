import { put, all, takeLatest  } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../constants/auth';
import { loginSuccess, loginError, logoutSuccess, logoutError } from '../actions/auth';

function* login(action) {
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

        yield put(loginSuccess(accessToken));
    }
    catch(e) {
        yield put(loginError(e));
    }
}

function* logout(action) {
    try {
        yield fetch("http://localhost:8080/oauth/revoke-token")
        .then(response => {
            if(response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from server");
            }
        });

    yield put(logoutSuccess());
    }
    catch(e) {
        yield put(logoutError(e));
    }
}

function* authSaga() {
    yield all([
        takeLatest(LOGIN, login),
        takeLatest(LOGOUT, logout)
    ]);
}

export default authSaga;