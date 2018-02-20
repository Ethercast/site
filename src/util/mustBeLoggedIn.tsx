import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

export default function mustBeLoggedIn(Component: React.ComponentType<any>): any {
  return connect(
    ({ auth: { loggedIn } }: AppState) => ({ loggedIn })
  )(
    class extends React.Component<{ loggedIn: boolean }> {
      render() {
        const { loggedIn, ...rest } = this.props;

        if (!loggedIn) {
          return (
            <Container>
              <h1>401</h1>
              <Message info>You must be logged in for this page</Message>
            </Container>
          )
        }

        return <Component {...rest}/>;
      }
    }
  );
}
