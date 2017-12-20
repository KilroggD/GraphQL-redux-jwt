const initialState = {
    isLoading: false,
    isFailure: false,
    todos: null,
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TODO_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
            }
        case 'TODOS_RECEIVE':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                todos: action.data,
            }
        case 'TODOS_FAILURE':
            return {
                ...state,
                isLoading: false,
                isFailure: true,
            }
        default:
            return state
    }
}

export default todosReducer
