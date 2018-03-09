import * as React from 'react';
import ReceiptTable from '../components/ReceiptTable';
import { deactivateSubscription, getSubscription } from '../util/api';
import { RouteComponentProps } from 'react-router';
import { FILTER_TYPE_NAMES, Subscription, LogFilterType } from '../util/model';
import { Loader, Button, Container, Header, Message } from 'semantic-ui-react';
import { HTMLProps } from 'react';
import * as _ from 'underscore';
import EtherscanLink from '../components/EtherscanLink';

function Ellipsis({ style, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      style={{
        ...style,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
      {...props}
    />
  );
}

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
            alert('subscription deactivated!');
            this.setState({
              promise: null,
              subscription: Object.assign(
                {},
                this.state.subscription,
                { status: 'deactivated' }
              )
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
      return (
        <Loader active>
          Getting subscription
        </Loader>
      );
    }

    if (!subscription) {
      return (
        <Container>
          <Message error>
            <Message.Header>Something went wrong...</Message.Header>
            <Message.Content>The subscription was not found</Message.Content>
          </Message>
        </Container>
      );
    }

    const { id, name, status, description, webhookUrl, filters, type } = subscription as Subscription;

    return (
      <Container>
        <Header as="h1" style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            {name}
          </div>
          <div style={{ flexShrink: 0 }}>
            {
              status === 'active' ? (
                <Button loading={promise !== null} negative onClick={this.deactivate}>Deactivate</Button>
              ) : <small>{status.toUpperCase()}</small>
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
        <p>This subscription is receiving events of type <strong>{type}</strong> with all of the following attributes:
        </p>
        <ul>
          {
            _.map(
              filters,
              (filterValues, type) => (
                <li key={type}>
                  {
                    _.map(
                      filterValues ? (
                        typeof filterValues === 'string' ?
                          [filterValues] :
                          filterValues
                      ) : [],
                      (filterValue, ix) => (
                        <div key={ix}>
                          <div>
                            <strong>
                              {FILTER_TYPE_NAMES[type]}
                            </strong>
                          </div>
                          <Ellipsis>
                            <em>
                              {
                                type === LogFilterType.address ? (
                                  <EtherscanLink address={filterValue}/>
                                ) : filterValue
                              }
                            </em>
                          </Ellipsis>
                        </div>
                      )
                    )
                  }
                </li>
              )
            )
          }
        </ul>

        <Header as="h3">Webhook receipts</Header>
        <p>These are the last 20 webhooks that were sent to the endpoint</p>
        <ReceiptTable subscriptionId={id}/>
      </Container>
    );
  }
}
