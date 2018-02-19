import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

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
