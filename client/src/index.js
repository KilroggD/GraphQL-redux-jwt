import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import {
    ConnectedRouter,
    routerMiddleware,
} from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import reducer from './reducers'

const history = createHistory()
const middleware = [thunk, routerMiddleware(history)]


const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
