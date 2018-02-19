import { Table, TableRow } from 'grommet';
import * as moment from 'moment';
import * as React from 'react';
import * as _ from 'underscore';
import { listReceipts } from '../util/api';
import { Receipt } from '../util/model';

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
        <thead>
        <tr>
          <th>Id</th>
          <th>When</th>
          <th>Successful</th>
        </tr>
        </thead>
        <tbody>
        {
          _.sortBy(
            receipts,
            ({ timestamp }: Receipt) => timestamp * -1)
            .map(
              ({ id, timestamp, successful }) => (
                <TableRow key={id}>
                  <td>{id}</td>
                  <td>{moment(timestamp).format('l LT')}</td>
                  <td>{successful ? 'Yes' : 'No'}</td>
                </TableRow>
              )
            )
        }
        </tbody>
      </Table>
    );
  }
}
