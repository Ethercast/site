import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Header } from 'semantic-ui-react';

export default function NotFound(props: RouteComponentProps<{}>) {
  return (
    <Container>
      <Header as="h2">404</Header>
      <p>
        The URL you have requested was not found.
      </p>
    </Container>
  );
}
