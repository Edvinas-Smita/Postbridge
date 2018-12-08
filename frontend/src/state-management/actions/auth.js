import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR, 
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from '../constants/auth';

export const login = credentials => ({
    type: LOGIN,
    credentials
});

export const loginSuccess = accessToken => ({
    type: LOGIN_SUCCESS,
    accessToken,
});

export const loginError = error => ({
    type: LOGIN_ERROR,
    error,
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