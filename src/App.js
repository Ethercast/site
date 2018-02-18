import { App  as GrommetApp, Header, Title } from 'grommet';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from './pages';
import Callback from './pages/auth/callback';
import SubscriptionsIndex from './pages/subscriptions';
import SubscriptionsNew from './pages/subscriptions/new';

class App extends Component {
  render() {
    return (
      <GrommetApp>
        <Header>
          <Title>
            ⧫ if-eth
          </Title>
        </Header>

        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/subscriptions" exact component={SubscriptionsIndex}/>
          <Route path="/subscriptions/new" exact component={SubscriptionsNew}/>
          <Route path="/auth/callback" exact component={Callback}/>
        </Switch>
      </GrommetApp>
    );
  }
}

export default App;
