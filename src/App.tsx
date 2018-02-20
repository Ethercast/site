import * as React from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { connect } from 'react-redux';
import { AppState } from './reducers';
import Auth from './util/auth';
import { Auth0DecodedHash } from 'auth0-js';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import NotFound from './pages/NotFound';
import ViewSubscriptionPage from './pages/ViewSubscriptionPage';
import CreateSubscription from './pages/CreateSubscription';
import ListSubscriptions from './pages/ListSubscriptions';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';


export default withRouter(
  connect(
    ({ auth: { loggedIn, principal } }: AppState) => ({ loggedIn, principal }),
    {
      logout: () => {
        Auth.logout();
        return {
          type: 'LOGGED_OUT'
        };
      }
    }
  )(
    class App extends React.Component<RouteComponentProps<{}> & { principal: Auth0DecodedHash | null, loggedIn: boolean, logout: () => any }> {
      render() {
        const { logout, principal } = this.props;
        return (
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <div>
              <AppHeader principal={principal} onLogOut={logout}/>
            </div>

            <div style={{ flexGrow: 1 }}>
              <div style={{ paddingTop: '7em' }}>
                <Switch>
                  <Route path="/" exact
                         component={
                           () => <Container><h1>Dashboard</h1><p>Coming soon...</p></Container>
                         }/>
                  <Route path="/subscriptions/new" exact component={CreateSubscription}/>
                  <Route path="/subscriptions" exact component={ListSubscriptions}/>
                  <Route path="/subscriptions/:id" exact component={ViewSubscriptionPage}/>
                  <Route path="*" component={NotFound}/>
                </Switch>
              </div>
            </div>

            <div style={{ flexShrink: 0 }}>
              <AppFooter/>
            </div>
          </div>
        );
      }
    }
  )
);
