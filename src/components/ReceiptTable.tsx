import * as moment from 'moment';
import * as React from 'react';
import * as _ from 'underscore';
import { listReceipts } from '../util/api';
import { Receipt } from '../util/model';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

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
                          <Icon disabled name="check"/> :
                          <Icon disabled name="exclamation"/>
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
