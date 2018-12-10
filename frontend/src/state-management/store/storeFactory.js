import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import rootSaga from '../sagas';
import createSagaMiddleware, { END } from 'redux-saga';
import {loadState, saveState } from './localStorage';
import reducers from '../reducers';
import thottle from 'lodash.throttle';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
    routerMiddleware(createBrowserHistory()),
    sagaMiddleware,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();
const store = createStore(
    reducers, 
    persistedState,
    composeEnhancers(middleware));

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

sagaMiddleware.run(rootSaga);

store.subscribe(thottle(() => {
    saveState({
        auth: {
            accessToken: store.getState().auth.accessToken,
            isAuthenticated: store.getState().auth.isAuthenticated,
            user: {
                firstName: store.getState().auth.user.firstName,
                lastName: store.getState().auth.user.lastName,
            }
        }
    });
  }, 1000));

export default store;
