import ApiService from '../ApiService'
import StorageService from '../StorageService'
import routes from '../routes'
import { push } from 'react-router-redux'

const loginSuccess = () => ({
    type: 'AUTH_SUCCESS',
})

const loginFailure = () => ({
    type: 'AUTH_FAIL',
})

const logoutAction = () => ({
    type: 'AUTH_LOGOUT'
})

const requestProfile = () => ({
    type: 'AUTH_REQUEST_PROFILE',
})

const receiveProfile = (data) => ({
    type: 'AUTH_RECEIVE_PROFILE',
    data
})

/**
 * Sync and async action creators
 * 
 */

export const login = (params) => async dispatch => {
    try {
        const res = await ApiService.login(params)
        StorageService.setToken(res.token)
        dispatch(loginSuccess())
        dispatch(push('/'))
    } catch (e) {
        console.error(e.message)
        dispatch(loginFailure())
    }
}

export const logout = () => dispatch => { //destroy token and logout
    StorageService.removeToken()
    dispatch(logoutAction())
    dispatch(push('/login'))
}


export const verifyToken = () => async dispatch => {
    if (!StorageService.getToken()) { //if no token - do nothing
        dispatch(logoutAction())
        return
    }
    try {
        dispatch(requestProfile)
        await ApiService.verify_token(StorageService.getToken())
        dispatch(loginSuccess())
        dispatch(receiveProfile())
    } catch (e) {
        //remove token and logout if invalid
        console.error(e.message)
        StorageService.removeToken()
        dispatch(logoutAction())
    }
}
