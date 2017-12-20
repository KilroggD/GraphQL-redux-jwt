import React from 'react'
import UserList from '../components/UserList'
import UserForm from '../forms/UserForm'
import { connect } from 'react-redux'
import { getUsers } from '../actions/usersActions'
import { loadFormAction } from '../actions/formActions'

class UserListContainer extends React.Component {

    componentDidMount() {
        this.props.loadForm();
    }

    render() {
        //add loading and failure state
        if(this.props.isLoading) {
            return <span>Loading...</span>
        }

        if(this.props.isFailure) {
            return <span>Error loading users!</span>
        }

        return <div className="user">
            <UserForm {...this.props.form} submitHandler={this.props.search} />
            <UserList users={this.props.users} />
        </div>;
    }


}

const mapStateToProps = ({ user, form }) => {
    return {
        ...user,
        form,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: (params) => { dispatch(getUsers(params)) },
        loadForm: () => { dispatch(loadFormAction()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
