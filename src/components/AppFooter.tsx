import * as React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';

export default function AppFooter(props: {}) {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '1em 0em' }}>
      <Container textAlign="center">
        <List horizontal inverted divided link>
          <List.Item>Say <a href="mailto:hello@if-eth.com">hello@if-eth.com</a></List.Item>
        </List>
      </Container>
    </Segment>
  );
}
