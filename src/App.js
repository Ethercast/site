import { App as GrommetApp, Box, Button, Header, Title } from 'grommet';
import { LoginIcon, LogoutIcon } from 'grommet/components/icons/base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SubscriptionsIndex from './pages/subscriptions';
import SubscriptionsNew from './pages/subscriptions/new';
import Auth from './util/auth';

export default withRouter(
  connect(
    ({ auth: { loggedIn } }) => ({ loggedIn }),
    {
      logout: () => {
        Auth.logout();
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
                    <Button label="Log in" icon={<LoginIcon/>} onClick={Auth.login}/> :
                    <Button label="Log out" icon={<LogoutIcon/>} onClick={logout}/>
                }
              </Box>
            </Header>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/subscriptions/new" exact component={SubscriptionsNew}/>
              <Route path="/subscriptions" exact component={SubscriptionsIndex}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </GrommetApp>
        );
      }
    }
  )
);
