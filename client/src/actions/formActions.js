import StorageService from '../StorageService'

const loadForm = (data) => {
    type: 'FORM_LOAD',
    data
}

export default formAction = () => (dispatch) => {
    //load form data from local storage
    const data = StorageService.getSearchData() || {}
    //dispatch an action
    dispatch(loadForm(data))
}
