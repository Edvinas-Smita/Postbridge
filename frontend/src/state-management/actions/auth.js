import {
    LOGIN,
    AUTH,
    AUTH_SUCCESS,
    AUTH_ERROR, 
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    GET_USER_DETAILS,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_ERROR
} from '../constants/auth';

export const login = credentials => ({
    type: LOGIN,
    credentials
})

export const auth = credentials => ({
    type: AUTH,
    credentials
});

export const authSuccess = accessToken => ({
    type: AUTH_SUCCESS,
    accessToken,
});

export const authError = error => ({
    type: AUTH_ERROR,
    error,
});

export const getUserDetails = () => ({
    type: GET_USER_DETAILS
});

export const getUserDetailsSuccess = (user) => ({
    type: GET_USER_DETAILS_SUCCESS,
    user
});

export const getUserDetailsError = error => ({
    type: GET_USER_DETAILS_ERROR,
    error
});

export const logout = () => ({
    type: LOGOUT,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutError = () => ({
    type: LOGOUT_ERROR,
});