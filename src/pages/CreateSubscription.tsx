import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { createSubscription } from '../util/api';
import { ConditionType, Subscription } from '../util/model';
import SubscriptionForm from '../components/subscriptions/SubscriptionForm';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

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
    promise: null,
    error: null
  };

  removeMessage = () => this.setState({ error: null });

  render() {
    const { subscription, error, promise } = this.state;

    return (
      <Container>
        <Header as="h1">Create subscription</Header>
        <SubscriptionForm
          loading={!!promise}
          value={subscription}
          onChange={subscription => this.setState({ subscription })}
          onSubmit={this.createSubscription}
        />
        {
          error !== null ? (
              <Message error onDismiss={this.removeMessage}>
                {(error as any).message}
              </Message>
            ) :
            null
        }
      </Container>
    );
  }
}
