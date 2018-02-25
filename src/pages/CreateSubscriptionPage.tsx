import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { createSubscription } from '../util/api';
import { ConditionType, Subscription } from '../util/model';
import SubscriptionForm from '../components/subscriptions/SubscriptionForm';
import { Container, Header, Message } from 'semantic-ui-react';
import mustBeLoggedIn from '../util/mustBeLoggedIn';

interface CreateSubscriptionPageState {
  subscription: Partial<Subscription>;
  error: Error | null;
  promise: Promise<any> | null;
}

export default mustBeLoggedIn(
  class CreateSubscriptionPage extends React.Component<RouteComponentProps<{}>, CreateSubscriptionPageState> {
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
                <Message negative onDismiss={this.removeMessage}>
                  {(error as any).message}
                </Message>
              ) :
              null
          }
        </Container>
      );
    }
  }
);
