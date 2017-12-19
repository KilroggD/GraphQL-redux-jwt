import formReducer from './formReducer'
import todosReducer from './todosReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers(
    {
        formReducer,
        todosReducer,
        usersReducer,
    }
)

export default rootReducer
