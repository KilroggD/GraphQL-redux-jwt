const initialState = {
    isAuthenticated: false,
    isFailure: false,
    isLoading: true,
    current_user: null,
}

/**
 * Reducer to handle login/logout
 * @param {object} state 
 * @param {object} action 
 */
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS': //successfull auth - either login or we have token already
            return {
                ...state,
                isAuthenticated: true,
                isFailure: false,
            }
        case 'AUTH_FAIL':
            return {
                ...state,
                isAuthenticated: false,
                isFailure: true
            }
        case 'AUTH_LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                isFailure: false,
                isLoading: false,
                current_user: null,
            }
        case 'AUTH_REQUEST_PROFILE': //request current user profile
            return {
                ...state,
                isFailure: false,
                isLoading: true,
                current_user: null,
            }
        case 'AUTH_RECEIVE_PROFILE': //receive current user profile and put into state
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                current_user: action.data
            }
        default:
            return state
    }
}

export default authReducer;
