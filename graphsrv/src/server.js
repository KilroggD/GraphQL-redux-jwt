import express from 'express'
import schema from './schema'
import graphqlHTTP from 'express-graphql'
import { createToken, verifyToken } from './auth'
const port = 3001;

const app = express();
const dev = process.env.NODE_ENV === 'development';

//allow-cors middleware
app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/login', (req, res, next) => {
    if (req.method === 'POST') {
        const token = createToken(req.body.email, req.body.password)
        if (token) { //send successful token
            res.json({ token })
        } else {
            res.status(403).json({ //no token - invalid credentials
                message: 'Login failed! Invalid credentials!'
            })
        }
    }
    //send 500 if login accessed via not 
    res.sendStatus(500)
});

/**
 * Verify token and return either error or valid user profile
 */
app.user('/verifyToken', (req, res, next) => {
    try {
        const token = req.body.token
        user = verifyToken(token)
        res.json({user})
    } catch (e) {
        res.status(401).json({ //unauthorized token
            message: e.message
        })
    }
});

//auth middleware
app.use('/graphql', (req, res, next) => {
    const token = req.headers['Authorizarion']
    try {
        req.user = verifyToken(token)
        next()
    } catch (e) {
        res.status(401).json({ //unauthorized token
            message: e.message
        })
    }
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    context: {
        user: req.user,
    }
}));

const server = app.listen(port, () => {
    console.log(`\n\nExpress listen at http://localhost:${port} \n`)
});
