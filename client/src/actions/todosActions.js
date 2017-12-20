import ApiService from '../ApiService'

const todosRequest = () => ({
    type: 'TODOS_REQUEST'
})

const todosReceive = (data) => ({
    type: 'TODOS_RECEIVE',
    data
})

const todosFailure = () => ({
    type: 'TODOS_FAILURE'
})

export const todosAction = (params) => async dispatch => {
    try {
        dispatch(todosRequest())
        const data = await ApiService.getTodos(params)
        dispatch(todosReceive(data))
    } catch(e) {
        console.error(e.message)
        dispatch(todosFailure())
    }
}
