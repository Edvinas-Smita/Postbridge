import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR, 
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from '../constants/auth';

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    accessToken: "",
    badCredentials: false
};

const AuthReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN: return {
            ...state,
            isFetching: true,
            isAuthenticated: false,
            badCredentials: false
        }
        case LOGIN_SUCCESS: return {
            ...state,
            accessToken: action.accessToken,
            isFetching: false,
            isAuthenticated: true,
            badCredentials: false
        }
        case LOGIN_ERROR: return {
            ...state,
            error: action.error,
            isFetching: false,
            isAuthenticated: false,
            badCredentials: true,
            accessToken: ""
        }
        case LOGOUT: return {
            ...state,
            isFetching: true
        }
        case LOGOUT_SUCCESS: return {
            ...state,
            isFetching: false,
            isAuthenticated: false,
            accessToken: "",
        }
        case LOGOUT_ERROR: return {
            ...state,
            error: action.error,
            isFetching: false,
            isAuthenticated: false,
            accessToken: "",
        }
        default: return state;
    }
}

export default AuthReducer;