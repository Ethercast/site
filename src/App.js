import { Header, Title } from 'grommet';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Index from './pages';
import Callback from './pages/auth/callback';
import SubscriptionsIndex from './pages/subscriptions';
import SubscriptionsNew from './pages/subscriptions/new';
import makeStore from './utilities/makeStore';

const store = makeStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
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
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
