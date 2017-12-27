import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import routes from '../routes'
import Loading from '../components/Loading'
import { verifyToken } from '../actions/authActions'

/**
 * Private route to navigate over admin/private routes
 * If not logged in - goes to login
 * If not admin but required - throws an error!
 */

class PrivateRoute extends React.Component {

    componentWillMount() {
        this.props.dispatch(verifyToken())
    }

    render() {
        const {
            isAuthenticated,
            component: Component,
            current_user,
            ...props
        } = this.props
        if (this.props.isLoading) {
            return <Loading />;
        }
        return (
            <Route
                {...props}
                render={props =>
                    isAuthenticated
                        ? <Component {...props} />
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
