import { socketMiddleware } from './middleware';
import { wsActions, TwsActionsUnion } from './actions/wsActions';
import { TBurgerVendorActionsUnion } from './actions/burgerVendor';
import { TUserActionsUnion } from './actions/userActions';

import { rootReducer } from './reducers';
import { createStore, compose, applyMiddleware, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import thunk from 'redux-thunk';

export const wsCreatedMiddleware = socketMiddleware(wsActions);
export type TApplicationActionsUnion = TBurgerVendorActionsUnion | TUserActionsUnion | TwsActionsUnion;

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsCreatedMiddleware));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActionsUnion>>;
