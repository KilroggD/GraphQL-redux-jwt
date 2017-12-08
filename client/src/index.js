import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Route, Switch } from 'react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
} from 'react-router-redux'
import { rootReducer } from './reducers'
import registerServiceWorker from './registerServiceWorker';

import { rootReducer } from './reducers'
import { rootReducer } from './reducers'
import App from './App';

const history = createHistory()
const reducer = combineReducers({ routerReducer, rootReducer })
const middleware = [thunk, routerMiddleware(history)]


const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();


/*
npm i -s redux react-redux react-router-redux redux-thunk
*/