import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Card } from 'semantic-ui-react';
import { Subscription } from '../../debt/ethercast-backend-model';

export default withRouter(
  class extends React.Component<RouteComponentProps<{}> & { subscription: Subscription }> {
    render() {
      const { history, subscription: { id, name, status, description, timestamp } } = this.props;

      const active = status !== 'deactivated';
      return (
        <Card onClick={() => history.push(`/subscriptions/${id}`)}
              style={{ opacity: active ? 1 : 0.6 }}>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta style={{ color: active ? 'green' : null }}>{status.toUpperCase()}</Card.Meta>
            <Card.Description style={{ wordBreak: 'break-word', marginBottom: 8 }}>
              {description && description.length > 0 ? description : <em>No description</em>}
            </Card.Description>
            <Card.Content>{moment(timestamp * 1000).format('l LT')}</Card.Content>
          </Card.Content>
        </Card>
      );
    }
  }
);
