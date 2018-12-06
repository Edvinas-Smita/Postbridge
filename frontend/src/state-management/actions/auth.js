import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    LOGGED_IN,
    SIGN_IN_ERROR, 
    SIGN_OUT
} from '../constants/auth';

export const signIn = credentials => ({
    type: SIGN_IN,
    credentials
});

export const signInSuccess = accessToken => ({
    type: SIGN_IN_SUCCESS,
    accessToken,
});

export const loggedIn = () => ({
    type: LOGGED_IN,
})

export const signInError = error => ({
    type: SIGN_IN_ERROR,
    error,
});

export const signOut = () => ({
    type: SIGN_OUT,
});