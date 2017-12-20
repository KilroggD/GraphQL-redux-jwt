const initialState = {
    isLoading: false,
    isFailure: false,
    users: null,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
            }
        case 'USERS_RECEIVE':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                users: action.data,
            }
        case 'USERS_FAILURE':
            return {
                ...state,
                isLoading: false,
                isFailure: true,
            }
        default:
            return state
    }
}

export default usersReducer
