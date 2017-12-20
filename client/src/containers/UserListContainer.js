import React from 'react'
import UserList from '../components/UserList'
import UserForm from '../forms/UserForm'
import { connect } from 'react-redux'
import { getUsers } from '../actions/usersActions'
import { loadForm, loadFormAction, clearFormAction } from '../actions/formActions'

class UserListContainer extends React.Component {

    componentDidMount() {
        this.props.loadForm();
        this.props.search();
    }

    render() {
        //add loading and failure state
        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.isFailure) {
            return <span>Error loading users!</span>
        }

        return <div className="user">
            <UserForm data={this.props.form}
                submitHandler={this.props.search}
                changeHandler={this.props.changeForm}
                clearHandler={this.props.clearForm} />
            {this.props.users && <UserList users={this.props.users} />}
        </div>;
    }


}

const mapStateToProps = ({ users, form }) => {
    return {
        ...users,
        form,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: () => { dispatch(getUsers()) },
        loadForm: () => { dispatch(loadFormAction()) },
        changeForm: (params) => { dispatch(loadForm(params)) },
        clearForm: (params) => {
            dispatch(clearFormAction())
            dispatch(getUsers())
         },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
