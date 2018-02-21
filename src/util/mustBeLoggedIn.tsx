import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Container, Header, Message } from 'semantic-ui-react';

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
              <Header as="h1">Sorry, there's a problem!</Header>
              <Message info>
                <Message.Header>
                  You are not logged in
                </Message.Header>
                <p>
                  Please log in to continue.
                </p>
              </Message>
            </Container>
          );
        }

        return <Component {...rest}/>;
      }
    }
  );
}
