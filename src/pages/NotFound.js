import React from 'react';
import withAppContainer from '../util/withAppContainer';

export default withAppContainer(function NotFound(props) {
  return (
    <div>
      <h2>404</h2>
      <p>
        The URL you have requested was not found.
      </p>
    </div>
  )
});
