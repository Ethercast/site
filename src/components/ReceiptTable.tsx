import * as moment from 'moment';
import * as React from 'react';
import * as _ from 'underscore';
import { listReceipts } from '../util/api';
import { Dimmer, Icon, Message, Table } from 'semantic-ui-react';
import { WebhookReceipt } from '../debt/ethercast-backend-model';

interface State {
  receipts: WebhookReceipt[];
  promise: Promise<any> | null;
  error: string | null;
}

interface Props {
  subscriptionId: string;
}

export default class ReceiptTable extends React.Component<Props, State> {
  state = {
    receipts: [],
    promise: null,
    error: null
  };

  componentDidMount() {
    this.setState({
      promise: listReceipts(this.props.subscriptionId)
        .then(receipts => this.setState({ receipts, promise: null }))
        .catch(error => this.setState({ error: error.message, promise: null }))
    });
  }

  render() {
    const { error, receipts, promise } = this.state;

    if (error) {
      return (
        <Message warning>
          <Message.Header>Failed to get webhook receipt list</Message.Header>
          <p>
            {error}
          </p>
        </Message>
      );
    }

    return (
      <Dimmer.Dimmable>
        <Dimmer active={!!promise} inverted/>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>When</Table.HeaderCell>
              <Table.HeaderCell>Successful</Table.HeaderCell>
              <Table.HeaderCell>Status Code</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              receipts.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4}>
                    No events have been delivered to this endpoint
                  </Table.Cell>
                </Table.Row>
              ) : null
            }
            {
              _.sortBy(receipts, ({ timestamp }: WebhookReceipt) => timestamp * -1)
                .map(
                  ({ id, timestamp, result: { statusCode, success } }) => (
                    <Table.Row title={id} key={id}>
                      <Table.Cell>{moment(timestamp * 1000).format('l LT')}</Table.Cell>
                      <Table.Cell style={{ paddingLeft: 32 }}>
                        {
                          success ?
                            <Icon disabled name="check" color="green"/> :
                            <Icon disabled name="exclamation triangle" color="red"/>
                        }
                      </Table.Cell>
                      <Table.Cell>
                        {statusCode}
                      </Table.Cell>
                    </Table.Row>
                  )
                )
            }
          </Table.Body>
        </Table>
      </Dimmer.Dimmable>
    );
  }
}
