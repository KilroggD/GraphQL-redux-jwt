import formReducer from './formReducer'
import todosReducer from './todosReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers(
    {
        form: formReducer,
        todos: todosReducer,
        users: usersReducer,
        routerReducer
    }
)

export default reducer
