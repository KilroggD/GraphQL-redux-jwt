import jwt from 'jsonwebtoken'
import Users from './data/users'
import find from 'lodash/find';

const expiresIn = '3h'
const secret = 'samplejwtauthgraphql'
const tokenPrefix = 'JWT'

/**
 * Use email as login, use password as password
 * @param {string} email 
 * @param {string} password
 */
export const createToken = (email, password) => {
    if (!email || !password) { //no credentials = fail
        return false
    }
    const user = find(Users,
        (user) => {
            return user.email === email.toLowerCase()
                && user.last_name.toLowerCase() === password
        }
    );
    if (!user) { //return false if not found
        return false
    }
    const payload = {
        username: user.email,
    }
    const token = jwt.sign(payload, secret, {
        expiresIn
    })
    return token
}

/**
 * @returns {Object} - current user object
 * @param {string} token header
 */
export const verifyToken = (token) => {
    const [prefix, payload] = token.split(' ')
    let user = null
    if (!payload) { //no token in the header
        throw new Error('No token provided')
    }
    if (prefix !== tokenPrefix) { //unexpected prefix or format
        throw new Error('Invalid header format')
    }
    jwt.verify(payload, secret, (err, data) => {
        if (err) { //token is invalid
            throw new Error('Invalid token!')
        } else {
            user = find(Users, { email: data.username })
        }
    })
    if (!user) { //user does not exist in DB
        throw new Error('User doesn not exist')
    }
    return user
}
