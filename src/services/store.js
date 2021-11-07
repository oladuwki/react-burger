import { compose, applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const ReduxStore = createStore(rootReducer, enhancer);