import { Table, TableRow } from 'grommet';
import moment from 'moment';
import React from 'react';
import _ from 'underscore';
import { fetchWithAuth } from '../util/api/requests';

export default class ReceiptTable extends React.Component {
  state = { receipts: [] };

  componentDidMount() {
    fetchWithAuth(`/subscriptions/${this.props.subscriptionId}/receipts`)
      .then(
        receipts => this.setState({ receipts })
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
          _.sortBy(receipts, ({ timestamp }) => timestamp * -1)
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
