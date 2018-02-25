import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Container, Header, Message } from 'semantic-ui-react';

export default function mustBeLoggedIn<TComponentProps extends object>(Component: React.ComponentType<TComponentProps>): React.ComponentType<TComponentProps> {
  return connect(
    ({ auth: { loggedIn, loading } }: AppState) => ({ loggedIn, loading })
  )(
    class extends React.Component<TComponentProps & { loading: boolean; loggedIn: boolean }> {
      render() {
        const { loggedIn, loading, ...rest } = this.props as any;

        if (loading) {
          return null;
        }

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
  ) as any;
}
