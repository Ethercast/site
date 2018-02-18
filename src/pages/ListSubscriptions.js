import { Box, Button, Notification, Search } from 'grommet';
import AddIcon from 'grommet/components/icons/base/Add';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SubscriptionList from '../components/subscriptions/list';
import { fetchCollection } from '../util/action-creators';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import objectToArray from '../util/objectToArray';
import withAppContainer from '../util/withAppContainer';


class ListSubscriptions extends React.Component {
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

    const filteredSubscriptions = search.indexOf('search') > -1 ?
      subscriptions.filter((subscription) => {
        const downcasedTerm = search.slice('?search?='.length - 1, search.length - 1).toLowerCase();
        return subscription.name.toLowerCase().indexOf(downcasedTerm) > -1;
      }) :
      subscriptions;


    return (
      <div>
        <h2 style={{paddingLeft: '8px', paddingRight: '8px'}}>My Subscriptions</h2>
        <Box flex={true} justify='end' direction='row' style={{paddingLeft: '11px', paddingRight: '11px'}} responsive={false}>
          <Search inline={true} fill={true} size='medium' style={{ width: '100%'}} placeHolder='Search'
                  onDOMChange={this.handleChange}
                  />
          <Button label="Create" icon={<AddIcon/>}  onClick={() => {
            history.push(`/subscriptions/new`);
          }}/>
        </Box>
        <SubscriptionList items={filteredSubscriptions}/>
        {
          subscriptions.length === 0 ? (
            <Notification
              style={{ marginTop: 20 }}
              message="You do not have any contract subscriptions"
              status="Warning"
            />
          ) : null
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
