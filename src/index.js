import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import makeStore from './util/makeStore';
import auth from './util/auth';

const store = makeStore();

store.dispatch(async dispatch => {
  try {
    const result = await auth.handleAuthentication();
    dispatch({ type: 'LOGGED_IN', payload: result });
  } catch (error) {
    console.error('failed to auth', error);
    dispatch({ type: 'LOGGED_OUT' });
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
