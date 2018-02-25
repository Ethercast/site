import * as moment from 'moment';
import * as React from 'react';
import * as _ from 'underscore';
import { listReceipts } from '../util/api';
import { Receipt } from '../util/model';
import { Message, Icon, Table, Dimmer } from 'semantic-ui-react';

interface State {
  receipts: Receipt[];
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
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>When</Table.HeaderCell>
              <Table.HeaderCell>Successful</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              receipts.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={3}>
                    No events have been delivered to this endpoint
                  </Table.Cell>
                </Table.Row>
              ) : null
            }
            {
              _.sortBy(receipts, ({ timestamp }: Receipt) => timestamp * -1)
                .map(
                  ({ id, timestamp, successful }) => (
                    <Table.Row key={id}>
                      <Table.Cell>{id}</Table.Cell>
                      <Table.Cell>{moment(timestamp).format('l LT')}</Table.Cell>
                      <Table.Cell>
                        {
                          successful ?
                            <Icon disabled name="check" color="green"/> :
                            <Icon disabled name="exclamation triangle" color="red"/>
                        }
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
