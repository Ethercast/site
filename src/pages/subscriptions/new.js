import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewSubscription from '../../components/subscriptions/new';
import { createRecord } from '../../util/action-creators';

class NewPage extends Component {
  render() {
    return (<NewSubscription onSubmit={this.props.createSubscription}/>);
  }
}

const formDataToParams = data => {
  const params = {};
  for (const key in data) {
    if (key === 'logic') {
      params[ key ] = data[ key ].reduce((result, item) => {
        result.push(item.conditions);
        return result;
      }, []);
    } else {
      params[ key ] = data[ key ];
    }
  }
  return params;
};

const mapStateToProps = (state) => {
};
const mapDispatchToProps = (dispatch) => ({
  createSubscription: (data) => dispatch(createRecord('subscriptions', formDataToParams(data)))
});

let SubscriptionsNew = connect(mapStateToProps, mapDispatchToProps)(NewPage);

export default SubscriptionsNew;
