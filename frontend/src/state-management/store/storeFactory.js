import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import rootSaga from '../sagas';
import createSagaMiddleware, { END } from 'redux-saga';

import reducers from '../reducers';

function storeFactory() {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = applyMiddleware(
        routerMiddleware(createBrowserHistory()),
        sagaMiddleware,
    );

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducers, composeEnhancers(middleware));

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    sagaMiddleware.run(rootSaga);

    return store;
}

export default storeFactory();
