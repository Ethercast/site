import { App as GrommetApp, Box, Button, Header, Title } from 'grommet';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SubscriptionsIndex from './pages/subscriptions';
import SubscriptionsNew from './pages/subscriptions/new';
import Auth from './util/auth';

export default connect(
  ({ auth: { loggedIn } }) => ({ loggedIn }),
  {
    logout: () => {
      return {
        type: 'LOGGED_OUT'
      };
    }
  }
)(
  class App extends Component {
    render() {
      const { loggedIn, logout } = this.props;

      return (
        <GrommetApp>
          <Header>
            <Title>
              <Link to="/">if-eth</Link>
            </Title>

            <Box flex={true} justify='end' direction='row' responsive={false}>
              {
                !loggedIn ?
                  <Button label="Log in" onClick={Auth.login}/> :
                  <Button label="Log out" onClick={logout}/>
              }
            </Box>
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
);
