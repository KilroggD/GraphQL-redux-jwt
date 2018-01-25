import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { verifyToken, logout } from '../actions/authActions'

/**
 * Private route to navigate over private routes
 * If not logged in - goes to login
 * If not admin but required - throws an error!
 */

class PrivateRoute extends React.Component {

    componentDidMount() {
        this.props.dispatch(verifyToken())
    }

    logoutHandler() {
        this.props.dispatch(logout())
    }

    render() {
        const {
            isAuthenticated,
            component: Component,
            current_user,
            ...props
        } = this.props
        if (this.props.isLoading) {
            return <Loading />
        }
        if (isAuthenticated && !current_user) {
            return null
        }
        return (
            <Route
                {...props}
                render={props =>
                    isAuthenticated
                        ?
                        <main>
                            <Header current_user={current_user} logout={this.logoutHandler.bind(this)} />
                            <Component {...props} />
                        </main>
                        : (
                            <Redirect to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }} />
                        )
                }
            />
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const current_user = auth.current_user;
    const isAuthenticated = auth.isAuthenticated;
    return {
        isAuthenticated,
        current_user,
        isLoading: auth.isLoading,
    }
}

export default connect(mapStateToProps)(PrivateRoute)
