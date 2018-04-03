import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import mustBeLoggedIn from '../util/mustBeLoggedIn';

export default mustBeLoggedIn(
  class ApiKeysPage extends React.PureComponent {
    render() {
      return (
        <Container>
          <Header as="h2">
            My API keys
          </Header>
          <p>
            Soon you will be able to create API keys to programmatically access the Ethercast API to create
            subscriptions. Come back in a few days.
          </p>
        </Container>
      );
    }
  }
);
