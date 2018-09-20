import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Container, Header, Loader, Message } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import * as _ from 'underscore';
import Ellipsis from '../components/Ellipsis';
import EtherscanLink from '../components/EtherscanLink';
import Linkify from '../components/Linkify';
import ReceiptTable from '../components/ReceiptTable';
import { EthercastTypes } from '@ethercast/model';
import { deactivateSubscription, getSubscription } from '../util/api';
import { FILTER_TYPE_INFO } from '../util/filter-type-names';

export default class ViewSubscriptionPage extends React.Component<RouteComponentProps<{ id: string }>, { subscription: EthercastTypes.Subscription | null, promise: Promise<any> | null }> {
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

    const { name, id } = subscription as EthercastTypes.Subscription;

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

  secretRef: any;
  setSecretRef = (ref: any) => this.secretRef = ref;
  copySecret = () => {
    this.secretRef.inputRef.select();

    try {
      const successful = document.execCommand('copy');
      alert(successful ? `Copied secret to clipboard` : `Failed to copy!`);
    } catch (err) {
      console.error(err);
      alert('Failed to copy!');
    }
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

    const {
      id, name, status, description, webhookUrl,
      filters,
      type,
      secret
    } = subscription as EthercastTypes.LogSubscription | EthercastTypes.TransactionSubscription;

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
            description ? <Linkify children={description}/> : <em>No description</em>
          }
        </p>

        <p>
          Endpoint: <a href={webhookUrl} target="_blank">{webhookUrl}</a>
        </p>

        <Header as="h3">Subscription secret</Header>
        <p>
          The subscription secret below is used to sign all requests to the endpoint.
          You can use it to verify requests made to your webhook are coming from Ethercast.
        </p>
        <Message info>
          <Icon name="question circle"/> Need help validating signatures? Try out the <a target="_blank"
                                                                                         href="https://ethercast.github.io/calculate-signature/">@ethercast/calculate-signature</a> npm
          module.
        </Message>

        <div>
          <Input
            ref={this.setSecretRef}
            action={{
              color: 'blue',
              labelPosition: 'right',
              icon: 'copy',
              content: 'Copy',
              onClick: this.copySecret
            }}
            value={secret}
            readOnly
          />
        </div>


        <Header as="h3">Subscription filters</Header>
        <p>This subscription is receiving events of type <strong>{type}</strong> with all of the following attributes:
        </p>
        <ul>
          {
            _.map(
              filters,
              (filterValues, type) => (
                filterValues ? (
                  <li key={type}>
                    {
                      _.map(
                        (
                          typeof filterValues === 'string' ?
                            [ filterValues ] :
                            filterValues
                        ),
                        (filterValue, ix) => (
                          <div key={ix}>
                            <div>
                              <strong>
                                {FILTER_TYPE_INFO[ type ].name}
                              </strong>
                            </div>
                            <Ellipsis>
                              <em>
                                {
                                  type === 'address' ||
                                  type === 'from' ||
                                  type === 'to'
                                    ? (
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
                ) : null
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
