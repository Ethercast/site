import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { createSubscription } from '../util/api';
import { Subscription } from '../util/model';
import SubscriptionForm from '../components/SubscriptionForm';

export default class CreateSubscription extends React.Component<RouteComponentProps<{}>, { subscription: Partial<Subscription> }> {
  createSubscription = () => {
    createSubscription(this.state.subscription)
      .then(
        () => {
          this.props.history.push(`/subscriptions`);
        }
      )
      .catch(
        (error: any) => {
          console.log(error);
        }
      );
  };

  state = {
    subscription: {}
  };

  render() {
    return (
      <div>
        <h2>Create subscription</h2>
        <SubscriptionForm
          value={this.state.subscription}
          onChange={subscription => this.setState({ subscription })}
          onSubmit={this.createSubscription}
        />
      </div>
    );
  }
}
