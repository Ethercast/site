import * as React from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { connect } from 'react-redux';
import Auth from './util/auth-util';
import { Auth0UserProfile } from 'auth0-js';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import NotFoundPage from './pages/NotFoundPage';
import ViewSubscriptionPage from './pages/ViewSubscriptionPage';
import CreateSubscriptionPage from './pages/CreateSubscriptionPage';
import ListSubscriptionsPage from './pages/ListSubscriptionsPage';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';
import { AppState } from './reducers';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import ListApiKeysPage from './pages/ListApiKeysPage';
import CreateApiKeyPage from './pages/CreateApiKeyPage';

interface AppProps extends RouteComponentProps<{}> {
  principal: Auth0UserProfile | null;
  loggedIn: boolean;
  logout: () => any;
  loading: boolean;
}

export default withRouter(
  connect(
    ({ auth: { loggedIn, principal, loading } }: AppState) => ({
      loggedIn,
      principal,
      loading
    }),
    {
      logout: () => {
        Auth.logout();
        return {
          type: 'LOGGED_OUT'
        };
      }
    }
  )(
    class extends React.Component<AppProps> {
      render() {
        const { logout, principal, loading } = this.props;

        if (loading) {
          return (
            <Loader active>
              Loading...
            </Loader>
          );
        }

        return (
          <div>
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
              <AppHeader principal={principal} onLogOut={logout}/>

              <ScrollToTop/>

              <div style={{ flexGrow: 1 }}>
                <div style={{ paddingTop: '2em' }}>
                  <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/subscriptions/new" exact component={CreateSubscriptionPage}/>
                    <Route path="/subscriptions" exact component={ListSubscriptionsPage}/>
                    <Route path="/subscriptions/:id" exact component={ViewSubscriptionPage}/>
                    <Route path="/api-keys/new" exact component={CreateApiKeyPage}/>
                    <Route path="/api-keys" exact component={ListApiKeysPage}/>
                    <Route path="*" component={NotFoundPage}/>
                  </Switch>
                </div>
              </div>

              <AppFooter/>
            </div>
          </div>
        );
      }
    }
  )
);
