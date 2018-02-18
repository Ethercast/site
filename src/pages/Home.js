import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/subscriptions">My subscriptions</Link>
          </li>
          <li>
            <Link to="/subscriptions/new">Create subscription</Link>
          </li>
        </ul>
      </div>
    );
  }
}
