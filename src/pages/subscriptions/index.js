import React from 'react';
import { connect } from 'react-redux';
import SubscriptionList from '../../components/subscriptions/list';
import { fetchCollection } from '../../utilities/action-creators';
import objectToArray from '../../utilities/objectToArray';

class IndexPage extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions();
  }

  render() {
    return (<SubscriptionList items={this.props.subscriptions}/>);
  }
}

const mapStateToProps = (state) => ({ subscriptions: objectToArray(state.entities.subscriptions) });
const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchCollection('subscriptions'))
});

let SubscriptionsIndex = connect(mapStateToProps, mapDispatchToProps)(IndexPage);

export default SubscriptionsIndex;
