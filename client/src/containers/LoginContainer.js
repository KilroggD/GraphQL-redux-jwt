import React from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router-dom'
//import routes from '../routes'
import LoginForm from '../forms/LoginForm'
import { login } from '../actions/authActions'

/**
 * Login form redux wrapper
 */

class Login extends React.Component {


    render() {
        return <div className="login__form">
            <LoginForm handler={this.props.login} />
            {this.props.isFailure &&
                <p className="error">Login failed</p>
            }
        </div>
    }

}


const mapStateToProps = ({ auth }) => {
    const { isAuthenticated, isFailure } = auth;
    return {
        isAuthenticated,
        isFailure,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (params) => { dispatch(login(params)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
