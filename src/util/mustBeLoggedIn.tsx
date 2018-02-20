import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Container, Message } from 'semantic-ui-react';

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
          );
        }

        return <Component {...rest}/>;
      }
    }
  );
}
