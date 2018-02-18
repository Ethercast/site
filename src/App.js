import { App as GrommetApp, Box, Button, Header, Search, Title } from 'grommet';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Index from './pages';
import Callback from './pages/auth/callback';
import SubscriptionsIndex from './pages/subscriptions';
import SubscriptionsNew from './pages/subscriptions/new';

export default withRouter(
  class App extends Component {
    handleChange = ({ target: { value: search } }) => {
      const { history } = this.props;

      history.push({
        path: '/subscriptions',
        search: `search=${search}`
      });
    };

    render() {
      return (
        <GrommetApp>
          <Header>
            <Title>
              if-eth
            </Title>
            <Box flex={true} justify='end' direction='row' responsive={false}>
              <Search inline={true} fill={true} size='medium' placeHolder='Search'
                      onDOMChange={this.handleChange}
                      dropAlign={{ 'right': 'right' }}/>
              <Button label="Create"/>
            </Box>
          </Header>

          <Switch>
            <Route path="/" exact component={Index}/>
            <Route path="/subscriptions/new" exact component={SubscriptionsNew}/>
            <Route path="/subscriptions" exact component={SubscriptionsIndex}/>
            <Route path="/auth/callback" exact component={Callback}/>
          </Switch>
        </GrommetApp>
      );
    }
  }
);
