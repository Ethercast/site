import * as React from 'react';
import ReceiptTable from '../components/ReceiptTable';
import { deactivateSubscription, getSubscription } from '../util/api';
import { RouteComponentProps } from 'react-router';
import { CONDITION_NAMES, Subscription } from '../util/model';
import { Button, Container, Header, Message } from 'semantic-ui-react';

export default class ViewSubscriptionPage extends React.Component<RouteComponentProps<{ id: string }>, { subscription: Subscription | null, promise: Promise<any> | null }> {
  state = {
    subscription: null,
    promise: null
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    this.fetchSubId(id);
  }

  fetchSubId = (id: string) => {
    this.setState({
      promise: getSubscription(id)
        .then(
          subscription => {
            this.setState({ subscription, promise: null });
          }
        )
        .catch(
          error => {
            this.setState({ subscription: null, promise: null });
          }
        )
    });
  };

  deactivate = () => {
    const { promise, subscription } = this.state;
    if (promise) {
      return;
    }

    if (!subscription) {
      return;
    }

    const { name, id } = subscription as Subscription;

    if (!window.confirm(`Delete subscription: ${name}`)) {
      return;
    }

    this.setState({
      promise: deactivateSubscription(id)
        .then(
          () => {
            this.setState({ promise: null }, () => {
              this.fetchSubId(this.props.match.params.id);
            });
          }
        )
        .catch(
          error => {
            this.setState({ promise: null });
          }
        )
    });
  };

  render() {
    const { promise, subscription } = this.state;

    if (promise && !subscription) {
      return null;
    }

    if (!subscription) {
      return (
        <Message error>The subscription was not found.</Message>
      );
    }

    const { id, name, status, description, webhookUrl, logic } = subscription as Subscription;

    return (
      <Container>
        <Header as="h2" style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            {name}
          </div>
          <div style={{ flexShrink: 0 }}>
            {
              status === 'active' ? (
                <Button onClick={this.deactivate}>Deactivate</Button>
              ) : <small>{status}</small>
            }
          </div>
        </Header>

        <p>
          {
            description ? description : <em>No description</em>
          }
        </p>

        <p>
          Endpoint: <a href={webhookUrl} target="_blank">{webhookUrl}</a>
        </p>

        <Header as="h3">Filters</Header>
        <p>This subscription is receiving logs with all of the following attributes:</p>
        <ul>
          {
            logic.map(
              (ors, orIx) => (
                <li key={orIx}>
                  {
                    ors.map(
                      ({ type, value }, ix) => <strong
                        key={ix}>{CONDITION_NAMES[type]}: <em>{value}</em></strong>
                    )
                  }
                </li>
              )
            )
          }
        </ul>

        <Header as="h3">Webhook receipts</Header>
        <p>This is the log of incidents of webhooks that have been reported to the endpoint.</p>
        <ReceiptTable subscriptionId={id}/>
      </Container>
    );
  }
}
