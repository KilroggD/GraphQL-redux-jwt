import StorageService from '../StorageService'

export const loadForm = (data) => ({
    type: 'FORM_LOAD',
    data,
})

const clearForm = () => ({
    type: 'FORM_CLEAR',
})

export const loadFormAction = () => (dispatch) => {
    //load form data from local storage
    const data = StorageService.getSearchData() || {}
    //dispatch an action
    dispatch(loadForm(data))
}

export const clearFormAction = () => (dispatch) => {
    StorageService.removeSearchData()
    dispatch(clearForm())
}
