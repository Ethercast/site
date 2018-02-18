import { Anchor, Box, Header, Menu, Title, Paragraph, Footer } from 'grommet';
import { ActionsIcon } from 'grommet/components/icons/base';
import TriggerIcon from 'grommet/components/icons/base/Trigger';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import CreateSubscription from './pages/CreateSubscription';
import Home from './pages/Home';
import ListSubscriptions from './pages/ListSubscriptions';
import NotFound from './pages/NotFound';
import Auth from './util/auth';
import withAppContainer from './util/withAppContainer';

export const ActiveAnchor = ({ path, ...rest }) => (
  <Route path={path} exact>
    {
      ({ match, history }) => (
        <Anchor
          onClick={e => {
            e.preventDefault();
            history.push(path);
          }}
          href={path}
          className={match ? 'active' : ''}
          {...rest}
        />
      )
    }
  </Route>
);

export default withRouter(
  connect(
    ({ auth: { loggedIn, principal } }) => ({ loggedIn, principal }),
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
        const { loggedIn, logout, principal } = this.props;

        const HeaderWithAppContainer = withAppContainer(Header);
        const FooterWithAppContainer = withAppContainer(Footer);


        return (
          <div>
            <HeaderWithAppContainer>
              <Title>
                <Link to="/">
                  <TriggerIcon/>
                </Link>
                if-eth
              </Title>

              <Box flex={true} justify='end' direction='row' responsive={false}
                   alignContent="center">
                <small style={{ alignSelf: 'center' }}>
                  {
                    loggedIn && principal ?
                      `logged in as ${principal.idTokenPayload.sub.split('|')[ 1 ]}` :
                      'logged out'
                  }
                </small>

                <Menu icon={<ActionsIcon/>}
                      dropAlign={{ 'right': 'right' }}>
                  <ActiveAnchor path="/">Home</ActiveAnchor>
                  <ActiveAnchor path="/subscriptions">My Subscriptions</ActiveAnchor>
                  {
                    !loggedIn ?
                      <Anchor href="#" onClick={Auth.login}>Log in</Anchor> :
                      <Anchor href="#" onClick={logout}>Log out</Anchor>
                  }
                </Menu>

              </Box>
            </HeaderWithAppContainer>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/subscriptions/new" exact component={CreateSubscription}/>
              <Route path="/subscriptions" exact component={ListSubscriptions}/>
              <Route path="*" component={NotFound}/>
            </Switch>
            <FooterWithAppContainer justify='between'>
              <Title>
                <s />
                 if-eth
              </Title>
              <Box direction='row'
                align='center'
                pad={{"between": "medium"}}>
                <Paragraph margin='none'>
                  © 2018 if-eth
                </Paragraph>

              </Box>
            </FooterWithAppContainer>
          </div>
        );
      }
    }
  )
);
