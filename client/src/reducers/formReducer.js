const formReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FORM_LOAD':
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export default formReducer
