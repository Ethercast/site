import { Notification } from 'grommet';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';

export default function mustBeLoggedIn(Component: React.ComponentType<any>): any {
  return connect(
    ({ auth: { loggedIn } }: AppState) => ({ loggedIn })
  )(
    class extends React.Component<{ loggedIn: boolean }> {
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
