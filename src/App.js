import { App as GrommetApp, Header, Title } from 'grommet';
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SubscriptionsIndex from './pages/subscriptions';
import SubscriptionsNew from './pages/subscriptions/new';

export default class App extends Component {
  render() {
    return (
      <GrommetApp>
        <Header>
          <Title>
            <Link to="/">if-eth</Link>
          </Title>
        </Header>

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/subscriptions/new" exact component={SubscriptionsNew}/>
          <Route path="/subscriptions" exact component={SubscriptionsIndex}/>
        </Switch>
      </GrommetApp>
    );
  }
}
