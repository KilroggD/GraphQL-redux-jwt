/**
 * Class to operate with storage
 */

class StorageService {
    constructor() {
        this.storage = window.localStorage
        this.form_key = 'search_form'
    }

    getSearchData() {
        let data = this.storage.getItem(this.form_key) || false;
        if (data) {
            return JSON.parse(data)
        }
    }

    setSearchData(data) {
        if (data) {
            this.storage.setItem(this.form_key, JSON.stringify(data));
        }
    }

    removeSearchData() {
        this.storage.removeItem(this.form_key);
    }

}

export default new StorageService()
