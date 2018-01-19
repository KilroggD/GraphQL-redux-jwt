import React from 'react'
import './styles/style.css'
import UserListContainer from './containers/UserListContainer'
import TodoListContainer from './containers/TodoListContainer'
import LoginContainer from './containers/LoginContainer'
import { Switch } from 'react-router-dom'
import PrivateRoute from './containers/PrivateRoute'
import GuestRoute from './containers/GuestRoute'

const App = () => {
    return <Switch>
        <GuestRoute exact path='/login' component={LoginContainer} />
        <PrivateRoute exact path='/' component={UserListContainer}/>
        <PrivateRoute path='/todos/:userId' component={TodoListContainer}/>
    </Switch>
};

export default App
