import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Divider, Header } from 'semantic-ui-react';

export default function Docs(props: RouteComponentProps<{}>) {
  return (
    <Container>
      <Header as="h2">Documentation</Header>
      <p>
      </p>
      <Divider/>
      <Header as="h3"><a href="https://docs.ethercast.io/ethercast-model/">Webhook Documentation</a></Header>
      <p>
      </p>
      <p>
        Documentation for the webhook payload can be found at <a href="https://docs.ethercast.io/ethercast-model/">https://docs.ethercast.io/ethercast-model</a>.
      </p>
      <Divider/>
      <Header as="h3"><a href="https://docs.ethercast.io/backend-model/">API Documentation</a></Header>
      <p>
      </p>
      <p>
        Documentation for the API can be found at <a href="https://docs.ethercast.io/backend-model/">https://docs.ethercast.io/backend-model</a>.
      </p>
    </Container>
  );
}
