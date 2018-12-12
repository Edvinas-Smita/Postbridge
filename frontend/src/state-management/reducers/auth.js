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

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    accessToken: "",
    badCredentials: false,
    error: "",
    user: {
        id: "",
        firstName: "",
        lastName: ""
    }
};

const AuthReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN: return {
            ...state,
            isFetching: true,
            isAuthenticated: false,
            badCredentials: false
        }
        case AUTH: return {
            ...state,
            isFetching: true,
            isAuthenticated: false,
            badCredentials: false
        }
        case AUTH_SUCCESS: return {
            ...state,
            accessToken: action.accessToken,
            isFetching: false,
            isAuthenticated: true,
            badCredentials: false
        }
        case AUTH_ERROR: return {
            ...state,
            error: action.error,
            isFetching: false,
            isAuthenticated: false,
            badCredentials: true,
            accessToken: ""
        }
        case GET_USER_DETAILS: return {
            ...state,
        }
        case GET_USER_DETAILS_SUCCESS: return {
            ...state,
            user: {
                id: action.user.id,
                firstName: action.user.firstName,
                lastName: action.user.lastName
            }
        }
        case GET_USER_DETAILS_ERROR: return {
            ...state,
            user: {
                firstName: "",
                lastName: ""
            }
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
            user: {
                firstName: "",
                lastName: ""
            }
        }
        case LOGOUT_ERROR: return {
            ...state,
            error: action.error,
            isFetching: false,
            isAuthenticated: false,
            accessToken: "",
            user: {
                firstName: "",
                lastName: ""
            }
        }
        default: return state;
    }
}

export default AuthReducer;