import React from 'react'
import ApiService from '../ApiService'
import UserList from '../components/UserList'
import UserForm from '../forms/UserForm'
import { connect } from 'react-redux'

class UserListContainer extends React.Component {

    render() {
        //add loading and failure state
        return <div className="user">
            <UserForm submitHandler={this.props.search} />
            <UserList users={this.props.users} />
        </div>;
    }


}

export default UserListContainer;
