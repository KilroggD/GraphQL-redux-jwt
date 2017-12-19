import StorageService from '../StorageService'

const loadForm = (data) => {
    type: 'FORM_LOAD',
    data
}

const formAction = () => (dispatch) => {
    //load form data from local storage
    const data = StorageService.getSearchData() || {}
    //dispatch an action
    dispatch(loadForm(data))
}

export default formAction
