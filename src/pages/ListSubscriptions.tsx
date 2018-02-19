import { Box, Button, Notification, Search } from 'grommet';
import AddIcon from 'grommet/components/icons/base/Add';
import Spinning from 'grommet/components/icons/Spinning';
import * as qs from 'qs';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import * as _ from 'underscore';
import SubscriptionList from '../components/subscriptions/list';
import { listSubscriptions } from '../util/api';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import { RouteComponentProps } from 'react-router';
import { Subscription } from '../util/model';

class ListSubscriptions extends React.Component<RouteComponentProps<{}>, { subscriptions: Subscription[] | null, promise: Promise<any> | null }> {
  state = {
    subscriptions: null,
    promise: null
  };

  componentDidMount() {
    this.fetchSubs();
  }

  fetchSubs = () => {
    const { promise } = this.state;
    if (promise) {
      return;
    }

    this.setState({
      promise: listSubscriptions()
        .then(subscriptions => this.setState({ subscriptions, promise: null }))
        .catch(error => this.setState({ promise: null }))
    });
  };

  handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const { history } = this.props;

    history.replace({
      pathname: '/subscriptions',
      search: `q=${value}`
    });
  };

  render() {
    const { history } = this.props;
    const { subscriptions, promise } = this.state;

    const { search } = history.location;

    let filteredSubs: Subscription[] = subscriptions || [];
    if (search && search.length > 1) {
      const { q: searchString } = qs.parse(search.substr(1));

      filteredSubs = _.filter(
        filteredSubs,
        ({ name, description }) => !searchString ||
          name.toLowerCase().indexOf(searchString) !== -1 ||
          description.toLowerCase().indexOf(searchString) !== -1
      );
    }

    const subs: Subscription[] = this.state.subscriptions || [];

    return (
      <div>
        <h2 style={{ paddingLeft: '8px', paddingRight: '8px' }}>My Subscriptions</h2>
        <Box flex={true} justify="end" direction="row"
             style={{ paddingLeft: '11px', paddingRight: '11px' }} responsive={false}>
          <Search inline={true} fill={true} size="medium" style={{ width: '100%' }}
                  placeHolder="Search"
                  onDOMChange={this.handleChange}
          />
          <Button label="Create" icon={<AddIcon/>} onClick={() => {
            history.push(`/subscriptions/new`);
          }}/>
        </Box>
        {
          promise ? (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Spinning/>
            </div>
          ) : (
            subs.length === 0 ? (
              <Notification
                style={{ marginTop: 20 }}
                message="You do not have any contract subscriptions"
                status="Warning"
              />
            ) : filteredSubs.length > 0 ? <SubscriptionList items={filteredSubs}/> : (
              <Notification
                style={{ marginTop: 20 }}
                message="No subscriptions matching the search terms"
                status="Warning"
              />
            )
          )
        }
      </div>
    );
  }
}

export default withRouter(mustBeLoggedIn(ListSubscriptions));
