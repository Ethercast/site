import { Button, Notification } from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';
import * as React from 'react';
import ReceiptTable from '../components/ReceiptTable';
import { deactivateSubscription, getSubscription } from '../util/api';
import { RouteComponentProps } from 'react-router';
import { Subscription } from '../util/model';

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

    if (promise) {
      return <Spinning/>;
    }

    if (!subscription) {
      return (
        <Notification message="The subscription was not found."/>
      );
    }

    const { id, name, status, description, webhookUrl, logic } = subscription as Subscription;

    return (
      <div>
        <h2 style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            {name}
          </div>
          <div style={{ flexShrink: 0 }}>
            {
              status === 'active' ? (
                <Button label="Deactivate" onClick={this.deactivate}/>
              ) : <small>{status}</small>
            }
          </div>
        </h2>

        <p>
          {
            description ? description : <em>No description</em>
          }
        </p>

        <p>
          Endpoint: <a href={webhookUrl} target="_blank">{webhookUrl}</a>
        </p>

        <h3>Filters</h3>
        <p>This subscription is receiving logs with all of the following attributes:</p>
        <ul>
          {
            logic.map(
              (ors, orIx) => (
                <li key={orIx}>
                  {
                    ors.map(
                      ({ type, value }, ix) => <strong key={ix}>{type}: <em>{value}</em></strong>
                    )
                  }
                </li>
              )
            )
          }
        </ul>

        <h3>Webhook receipts</h3>
        <p>This is the log of incidents of webhooks that have been reported to the endpoint.</p>
        <ReceiptTable subscriptionId={id}/>
      </div>
    );
  }
}
