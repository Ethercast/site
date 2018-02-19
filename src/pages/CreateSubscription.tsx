import * as React from 'react';
import { Toast } from 'grommet';
import { RouteComponentProps } from 'react-router';
import { createSubscription } from '../util/api';
import { ConditionType, Subscription } from '../util/model';
import SubscriptionForm from '../components/subscriptions/SubscriptionForm';

export default class CreateSubscription extends React.Component<RouteComponentProps<{}>, { subscription: Partial<Subscription>; error: Error | null; promise: Promise<any> | null }> {
  createSubscription = () => {
    this.setState({
      promise: createSubscription(this.state.subscription)
        .then(
          (subscription) => {
            this.props.history.push(`/subscriptions/${subscription.id}`);
          }
        )
        .catch(
          (error: any) => {
            this.setState({ error, promise: null });
          }
        )
    });
  };

  state = {
    subscription: {
      logic: [
        [
          { type: ConditionType.address, value: '' }
        ]
      ]
    },
    promise:null,
    error: null
  };

  closeToast = () => this.setState({ error: null });

  render() {
    const { subscription, error, promise } = this.state;

    return (
      <div>
        <h2>Create subscription</h2>
        <SubscriptionForm
          loading={!!promise}
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
