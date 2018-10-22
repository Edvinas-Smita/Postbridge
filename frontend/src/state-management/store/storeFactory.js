import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import reducers from '../reducers';

function storeFactory() {
    const middleware = applyMiddleware(
        routerMiddleware(createBrowserHistory()),
    );

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(reducers, composeEnhancers(middleware));
}

export default storeFactory();
