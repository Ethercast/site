import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

// swap this comment out with `const composeEnhancers = compose` to enable
// react dev tools. This should not be committed uncommented.
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

const middlewares = composeEnhancers(
   applyMiddleware(
     thunkMiddleware,
   ),
 );


export default (initialState, options) => {
    return createStore(appReducer, initialState, middlewares);
};
