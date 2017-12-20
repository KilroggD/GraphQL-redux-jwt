
const formReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FORM_LOAD':
            return {
                ...state,
                ...action.data,
            }
        case 'FORM_CLEAR':
            return {}
        default:
            return state
    }
}

export default formReducer
