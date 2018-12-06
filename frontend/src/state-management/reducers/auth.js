import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    LOGGED_IN,
    SIGN_IN_ERROR, 
    SIGN_OUT
} from '../constants/auth';

const initialState = {
    isLoggingIn: false,
    accessToken: ""
};

const AuthReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN: return {
            ...state,
            isLoggingIn: true
        }
        case SIGN_IN_SUCCESS: return {
            ...state,
            accessToken: action.accessToken
        }
        case LOGGED_IN: return {
            ...state,
            isLoggingIn: false
        }
        case SIGN_IN_ERROR: return {
            ...state,
            error: action.error,
            isLoggingIn: false,
            accessToken: ""
        }
        case SIGN_OUT: return {
            ...state,
            isLoggingIn: false,
            accessToken: ""
        }
        default: return state;
    }
}

export default AuthReducer;