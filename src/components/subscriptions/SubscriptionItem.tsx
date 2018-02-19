import * as moment from 'moment';
import * as React from 'react';
import { Subscription } from '../../util/model';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import { RouteComponentProps, withRouter } from 'react-router';

export default withRouter(
  class extends React.Component<RouteComponentProps<{}> & { subscription: Subscription }> {
    render() {
      const { history, subscription: { id, name, status, description, timestamp } } = this.props;

      return (
        <Card onClick={() => history.push(`/subscriptions/${id}`)}>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{status.toUpperCase()}</Card.Meta>
            <Card.Description>
              {description && description.length > 0 ? description : <em>No description</em>}
            </Card.Description>
            <Card.Content>{moment(timestamp).format('l LT')}</Card.Content>
          </Card.Content>
        </Card>
      );
    }
  }
);
