const initialState = {
    data: null,
}

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FORM_LOAD':
            return {
                ...state,
                data: action.data,
            }
        default:
            return state
    }
}

export default formReducer
