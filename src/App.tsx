import * as React from 'react';
import { Link } from 'react-router-dom';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import PageRouter from './PageRouter';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Header as="h3">
            <Link to="/">if-eth</Link>
          </Header>
        </Container>

        <PageRouter/>

        <Container>
          Say <a href="mailto:hello@if-eth.com">hello@if-eth.com</a>&emsp;© 2018 if-eth
        </Container>
      </div>
    );
  }
}
