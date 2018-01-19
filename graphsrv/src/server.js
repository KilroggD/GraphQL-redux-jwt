import express from 'express'
import bodyParser from 'body-parser'
import schema from './schema'
import graphqlHTTP from 'express-graphql'
import { createToken, verifyToken } from './auth'
const port = 3001;

const app = express();
const dev = process.env.NODE_ENV === 'development';
const jsonParser = bodyParser.json()
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

app.use('/login', jsonParser, (req, res) => {
    if (req.method === 'POST') {
        const token = createToken(req.body.email, req.body.password)
        if (token) { //send successful token
            res.status(200).json({ token })
        } else {
            res.status(403).json({ //no token - invalid credentials
                message: 'Login failed! Invalid credentials!'
            })
        }
    }
});

/**
 * Verify token and return either error or valid user profile
 */
app.use('/verifyToken', jsonParser, (req, res) => {
    if (req.method === 'POST') {
        try {
            const token = req.headers['authorization']
            const user = verifyToken(token)
            res.status(200).json({ user })
        } catch (e) {
            console.log(e.message)
            res.status(401).json({ //unauthorized token
                message: e.message
            })
        }
    }
});

//auth middleware
app.use('/graphql', (req, res, next) => {
    const token = req.headers['authorization']
    try {
        req.user = verifyToken(token)
        next()
    } catch (e) {
        res.status(401).json({ //unauthorized token
            message: e.message
        })
    }
});

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: {
        user: req.user,
    }
}))
);

const server = app.listen(port, () => {
    console.log(`\n\nExpress listen at http://localhost:${port} \n`)
});
