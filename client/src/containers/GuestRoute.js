import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

/**
 * Router for only guest stuff like Login/Register
 * If not guest - redirects to home
 */

class GuestRoute extends React.Component {
    render() {
        const {
            isAuthenticated,
            component: Component,
            ...props
        } = this.props        
        return (
            <Route
                {...props}
                render={props =>
                    !isAuthenticated
                        ? <Component {...props} />
                        : (
                            <Redirect to={{
                                pathname: '/',
                                state: { from: props.location }
                            }} />
                        )
                }
            />
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const isAuthenticated = auth.isAuthenticated
    return {
        isAuthenticated,
    }
}

export default connect(mapStateToProps)(GuestRoute)
