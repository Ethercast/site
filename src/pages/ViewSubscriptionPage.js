import { Button, Notification } from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';
import React from 'react';
import { deleteWithAuth, fetchWithAuth } from '../util/api/requests';
import withAppContainer from '../util/withAppContainer';

export default withAppContainer(class ViewSubscriptionPage extends React.Component {
  state = {
    subscription: null,
    promise: null
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    this.fetchSubId(id);
  }

  fetchSubId = id => {
    this.setState({
      promise: fetchWithAuth(`/subscriptions/${id}`)
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

    if (!window.confirm(`Delete subscription: ${subscription.name}`)) {
      return;
    }

    this.setState({
      promise: deleteWithAuth(`/subscriptions/${subscription.id}`)
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

    const { name, status, description, webhookUrl, logic } = subscription;

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
        <p>Receiving logs with all of the following attributes:</p>
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
        <p>
          Coming soon...
        </p>
      </div>
    );
  }
});
