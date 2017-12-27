/**
 * Class to operate with storage
 */

class StorageService {
    constructor() {
        this.storage = window.localStorage
        this.form_key = 'search_form'
        this.token_key = 'token'
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


    getToken() {
        return this.storage.getItem(this.token_key) || false;
    }

    setToken(token) {
        if (token) {
            this.storage.setItem(this.token_key, token);
        }
    }

    removeToken() {
        this.storage.removeItem(this.token_key);
    }

}

export default new StorageService()
