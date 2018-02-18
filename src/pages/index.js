import React from 'react';
import auth from '../util/auth.js';

export default class Index extends React.Component {
  render() {
    const isAuthenticated = auth.isAuthenticated();

    return (
      <div>
        {
          isAuthenticated ?
            <h1>you're logged in</h1> :
            <h1>you're logged out</h1>
        }
        {
          isAuthenticated ?
            <button onClick={auth.logout}>Logout</button> :
            <button onClick={auth.login}>Login</button>
        }
      </div>
    );
  }
}
