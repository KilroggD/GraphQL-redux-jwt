import ApiService from '../ApiService'

const requestUsers = () => ({
    type: 'USERS_REQUEST'
})

const receiveUsers = (data) => ({
    type: 'USERS_RECEIVE',
    data
})

const failureUsers = () => ({
    type: 'USERS_FAILURE',
})

const getUsers = (params) => async dispatch => {
    try {
        dispatch(requestUsers())
        const data = await ApiService.getUsers(params)
        dispatch(receiveUsers())
    } catch {
        dispatch(failureUsers())
    }
}

export default getUsers
