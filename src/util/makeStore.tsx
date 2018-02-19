import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from '../reducers';

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

const middlewares = composeEnhancers(
  applyMiddleware(
    thunkMiddleware
  )
);

export default function makeStore(initialState?: object) {
  return createStore(appReducer, initialState, middlewares);
};
