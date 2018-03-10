import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { createSubscription } from '../util/api';
import { Subscription, SubscriptionType } from '@ethercast/backend-model';
import SubscriptionForm from '../components/subscriptions/SubscriptionForm';
import { Container, Header, Message } from 'semantic-ui-react';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import * as _ from 'underscore';

interface CreateSubscriptionPageState {
  subscription: Partial<Subscription>;
  error: Error | null;
  promise: Promise<any> | null;
}

export default mustBeLoggedIn(
  class CreateSubscriptionPage extends React.Component<RouteComponentProps<{}>, CreateSubscriptionPageState> {
    createSubscription = () => {
      this.setState({
        promise: createSubscription({
          ...this.state.subscription,
          filters: _.mapObject(
            this.state.subscription.filters,
            (value: string) => typeof value === 'string' && value.length > 0 ?
              value.split(',') :
              null
          )
        })
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
        type: SubscriptionType.log,
        filters: {}
      },
      promise: null,
      error: null
    };

    removeMessage = () => this.setState({ error: null });

    render() {
      const { subscription, error, promise } = this.state;

      return (
        <Container>
          <Dimmer.Dimmable>
            <Dimmer active={!!promise} inverted>
              <Loader active={!!promise}/>
            </Dimmer>

            <Header as="h1">Create subscription</Header>
            <SubscriptionForm
              value={subscription}
              onChange={subscription => this.setState({ subscription })}
              onSubmit={this.createSubscription}
            />
          </Dimmer.Dimmable>
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
