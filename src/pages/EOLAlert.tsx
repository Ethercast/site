import { Container, Header } from 'semantic-ui-react';
import * as React from 'react';

const FINAL_DATE = 'Friday, October 12th 2018 @ 11:59PM';

export default class EOLAlert extends React.Component {
  render() {
    return (
      <Container style={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}>
        <Header as="h1">Ethercast.io is Shutting Down</Header>
        <Header as="h2">Effective {FINAL_DATE}</Header>
        <p>
          Unfortunately due to the large fixed cost of running the Ethercast.io service, we have decided that we can no
          longer run it. While we would love to contribute time towards improving the service and reducing the operational
          costs, we simply don't have the time.
        </p>
        <p>
          If you wish to continue to use Ethercast.io, you can find all of the source code
          on <a href="https://github.com/ethercast">GitHub/Ethercast</a>
        </p>
        <p>
          Your existing subscriptions and API keys will continue to work until {FINAL_DATE}.
          Please identify an alternate solution by this time.
        </p>
        <p>
          Contact us at <a href="mailto:hello@ethercast.io">hello@ethercast.io</a> with any questions.
        </p>
      </Container>
    );
  }
}