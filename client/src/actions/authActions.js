import ApiService from '../ApiService'
import StorageService from '../StorageService'
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
        const token = await ApiService.login(params)
        StorageService.setToken(token)
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
    if (!StorageService.getToken()) { //if no token - logout
        dispatch(logoutAction())
        return
    }
    try {
        dispatch(requestProfile())
        const user =await ApiService.verifyToken(StorageService.getToken())
        dispatch(receiveProfile(user))
        dispatch(loginSuccess())
    } catch (e) {
        //remove token and logout if invalid
        console.error(e.message)        
        StorageService.removeToken()
        dispatch(logoutAction())
    }
}
