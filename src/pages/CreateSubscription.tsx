import * as React from 'react';
import { Toast } from 'grommet';
import { RouteComponentProps } from 'react-router';
import { createSubscription } from '../util/api';
import { ConditionType, Subscription } from '../util/model';
import SubscriptionForm from '../components/subscriptions/SubscriptionForm';

export default class CreateSubscription extends React.Component<RouteComponentProps<{}>, { subscription: Partial<Subscription>; error: Error | null; }> {
  createSubscription = () => {
    createSubscription(this.state.subscription)
      .then(
        () => {
          this.props.history.push(`/subscriptions`);
        }
      )
      .catch(
        (error: any) => {
          this.setState({ error });
        }
      );
  };

  state = {
    subscription: {
      logic: [
        [
          { type: ConditionType.address, value: '' }
        ]
      ]
    },
    error: null
  };

  closeToast = () => this.setState({ error: null });

  render() {
    const { subscription, error } = this.state;

    return (
      <div>
        <h2>Create subscription</h2>
        <SubscriptionForm
          value={subscription}
          onChange={subscription => this.setState({ subscription })}
          onSubmit={this.createSubscription}
        />
        {
          error !== null ?
            <Toast status="critical" onClose={this.closeToast}>{(error as any).message}</Toast> :
            null
        }
      </div>
    );
  }
}
