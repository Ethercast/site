import { Box, Button, Notification, Search } from 'grommet';
import AddIcon from 'grommet/components/icons/base/Add';
import Spinning from 'grommet/components/icons/Spinning';
import qs from 'qs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'underscore';
import SubscriptionList from '../components/subscriptions/list';
import { fetchCollection } from '../util/action-creators';
import { fetchWithAuth } from '../util/api/requests';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import objectToArray from '../util/objectToArray';
import withAppContainer from '../util/withAppContainer';

class ListSubscriptions extends React.Component {
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
      promise: fetchWithAuth(`/subscriptions`)
        .then(subscriptions => this.setState({ subscriptions, promise: null }))
        .catch(error => this.setState({ promise: null }))
    });
  };

  handleChange = ({ target: { value: search } }) => {
    const { history } = this.props;

    history.push({
      path: '/subscriptions',
      search: `search=${search}`
    });
  };

  render() {
    const { history } = this.props;
    const { subscriptions, promise } = this.state;

    const { search } = history.location;

    const { search: searchString } = search && search.length > 1 ? qs.parse(search.substr(1)) : {};

    const filteredSubs = _.filter(
      subscriptions,
      ({ name, description }) => !searchString ||
        name.toLowerCase().indexOf(searchString) !== -1 ||
        description.toLowerCase().indexOf(searchString) !== -1
    );

    return (
      <div>
        <h2 style={{ paddingLeft: '8px', paddingRight: '8px' }}>My Subscriptions</h2>
        <Box flex={true} justify='end' direction='row'
             style={{ paddingLeft: '11px', paddingRight: '11px' }} responsive={false}>
          <Search inline={true} fill={true} size='medium' style={{ width: '100%' }}
                  placeHolder='Search'
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
            subscriptions && subscriptions.length === 0 ? (
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

const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchCollection('subscriptions'))
});

const SubscriptionsIndex = connect(mapStateToProps, mapDispatchToProps)(ListSubscriptions);

export default withAppContainer(withRouter(mustBeLoggedIn(SubscriptionsIndex)));
