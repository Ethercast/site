import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Box, Search, Button } from 'grommet';
import SubscriptionList from '../../components/subscriptions/list';
import { fetchCollection } from '../../util/action-creators';
import mustBeLoggedIn from '../../util/mustBeLoggedIn';
import objectToArray from '../../util/objectToArray';

class IndexPage extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions();
  }

  handleChange = ({ target: { value: search } }) => {
    const { history } = this.props;

    history.push({
      path: '/subscriptions',
      search: `search=${search}`
    });
  };

  render() {
    const { subscriptions, history } = this.props;
    const { search } = history.location;
    const filteredSubscriptions = search.indexOf('search') > -1 ? subscriptions.filter((subscription) => {
      const downcasedTerm = search.slice('?search?='.length - 1, search.length - 1).toLowerCase();
      return subscription.name.toLowerCase().indexOf(downcasedTerm) > -1;
    }) : subscriptions;

    return (
      <div>
        <Box flex={true} justify='end' direction='row' responsive={false} pad='small'>
          <Search inline={true} fill={true} size='medium' placeHolder='Search'
                  onDOMChange={this.handleChange}
                  dropAlign={{ 'right': 'right' }}/>
          <Button label="Create"/>
        </Box>
        <SubscriptionList items={filteredSubscriptions}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchCollection('subscriptions'))
});

let SubscriptionsIndex = connect(mapStateToProps, mapDispatchToProps)(IndexPage);

export default withRouter(mustBeLoggedIn(SubscriptionsIndex));
