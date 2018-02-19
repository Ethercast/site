import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

export default function mustBeLoggedIn(Component: React.ComponentType<any>): any {
  return connect(
    ({ auth: { loggedIn } }: AppState) => ({ loggedIn })
  )(
    class extends React.Component<{ loggedIn: boolean }> {
      render() {
        const { loggedIn, ...rest } = this.props;

        if (!loggedIn) {
          return <Message warning>You must be logged in for this page</Message>;
        }

        return <Component {...rest}/>;
      }
    }
  );
}
