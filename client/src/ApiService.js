/**
 * 
 * Small service for calling GraphQL API server
 */
class ApiService {

    /**
     * define base url and field schemas here
     * @returns {ApiService}
     */
    constructor() {
        this.baseUrl = 'http://localhost:3001'
        this.apiUrl = 'http://localhost:3001/graphql'
        this.userFields = `{id, first_name, last_name, email, department, country, todo_count}`
        this.todoFields = `{id title completed user {first_name, last_name}}`
    }
    /**
     * Generic function to fetch data from server via graphql API
     * @param {string} query
     * @returns {unresolved}
     */
    async getGraphQlData(query, token = false) {
        const query = `{${resource} ${this.paramsToString(params)} ${fields}}`
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: this.buildHeaders(token),
            body: JSON.stringify({ query }),
        });
        if (res.ok) {
            const body = await res.json();
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }

    /**
     * Generic API call (for non-graphql endpoints)
     * @param {string} url 
     * @param {object} params 
     */
    async apiCall(url, params = {}, method = 'POST') {
        const res = await fetch(`${this.baseUrl}${url}/`, {
            method,
            mode: 'cors',
            headers: this.buildHeaders(),
            body: JSON.stringify(params),
        })
        if (!res.ok) {
            throw new Error(res.status)
        }
        return res.body
    }


    /**
     * Build  http headers object
     * @param {string|boolean} token 
     */
    buildHeaders(token = false) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        if (token) {
            headers.append('Authorization', `JWT ${token}`);
        }

        return headers;
    }
    /**
     * 
     * @param {object} params
     * @returns {array} users list or empty list
     */
    async getUsers(params = {}) {
        const data = await this.getGraphQlData('users', params, this.userFields);
        //return users list
        return data.users;
    }

    /**
     * 
     * @param {object} params
     * @returns {array} users list or empty list
     */
    async getTodos(params = {}) {
        const data = await this.getGraphQlData('todos', params, this.todoFields);
        //return todos list
        return data.todos;
    }

    /**
     * Login user and return jwt token or throw error in case of fail
     * @param {string} login
     * @param {string} password
     */
    async login(params) {
        const res  = await this.apiCall('/login', params)
        return res.token
    }


    /**
     * Verify current token and return current user or throw error
     * @param {string} token 
     */
    async verifyToken(token) {
        const res = await this.apiCall('/verifyToken', {
            token,
        })
        return res.user
    }

    /**
     * 
     * @param {object} params
     * @returns {String} params converted to string for usage in graphQL
     */
    paramsToString(params) {
        let paramString = '';
        if (params.constructor === Object && Object.keys(params).length) {
            let tmp = [];
            for (let key in params) {
                let paramStr = params[key];
                if (paramStr !== '') {
                    if (typeof params[key] === 'string') {
                        paramStr = `"${paramStr}"`;
                    }
                    tmp.push(`${key}:${paramStr}`);
                }
            }
            if (tmp.length) {
                paramString = `(${tmp.join()})`;
            }
        }
        return paramString;
    }

}

export default new ApiService();
