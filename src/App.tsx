import * as React from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { connect } from 'react-redux';
import { AppState } from './reducers';
import Auth from './util/auth-util';
import { Auth0UserProfile } from 'auth0-js';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import NotFound from './pages/NotFound';
import ViewSubscriptionPage from './pages/ViewSubscriptionPage';
import CreateSubscription from './pages/CreateSubscription';
import ListSubscriptions from './pages/ListSubscriptions';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import HomePage from './pages/HomePage';


export default withRouter(
  connect(
    ({ auth: { loggedIn, principal, loading } }: AppState) => ({ loggedIn, principal, loading }),
    {
      logout: () => {
        Auth.logout();
        return {
          type: 'LOGGED_OUT'
        };
      }
    }
  )(
    class App extends React.Component<RouteComponentProps<{}> & { principal: Auth0UserProfile | null, loggedIn: boolean, logout: () => any; loading: boolean }> {
      render() {
        const { logout, principal, loading } = this.props;

        return (
          <Dimmer.Dimmable>
            <Dimmer inverted active={loading}/>
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
              <div>
                <AppHeader principal={principal} onLogOut={logout}/>
              </div>

              <div style={{ flexGrow: 1 }}>
                <div style={{ paddingTop: '2em' }}>
                  <Switch>
                    <Route path="/" exact component={HomePage}/>
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
          </Dimmer.Dimmable>
        );
      }
    }
  )
);
