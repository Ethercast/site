import * as moment from 'moment';
import * as React from 'react';
import * as _ from 'underscore';
import { listReceipts } from '../util/api';
import { Receipt } from '../util/model';
import { Icon, Table } from 'semantic-ui-react';

export default class ReceiptTable extends React.Component<{ subscriptionId: string }, { receipts: Receipt[] }> {
  state = {
    receipts: []
  };

  componentDidMount() {
    listReceipts(this.props.subscriptionId)
      .then(
        (receipts: Receipt[]) => this.setState({ receipts })
      );
  }

  render() {
    const { receipts } = this.state;

    return (
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
            _.sortBy(
              receipts,
              ({ timestamp }: Receipt) => timestamp * -1)
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
    );
  }
}
