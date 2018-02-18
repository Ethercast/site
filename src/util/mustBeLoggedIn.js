import { Notification } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';

export default function mustBeLoggedIn(Component) {
  return connect(
    ({ auth: { loggedIn } }) => ({ loggedIn })
  )(
    class extends React.Component {
      render() {
        const { loggedIn, ...rest } = this.props;

        if (!loggedIn) {
          return <Notification status="Warning" message="You must be logged in for this page"/>;
        }

        return <Component {...rest}/>;
      }
    }
  );
}
