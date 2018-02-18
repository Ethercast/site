import { Button } from 'grommet';
import Card from 'grommet/components/Card';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(
  ({ subscription, history }) => {
    return (
      <Card
        heading={subscription.name}
        label={subscription.status}
        style={{ border: '1px solid rgba(0,0,0,0.2)' }}
        description={moment(subscription.timestamp).format('l LT')}
      >
        <p>{subscription.description}</p>
        <Button label="View subscription" onClick={e => {
          history.push(`/subscriptions/${subscription.id}`);
        }}/>
      </Card>
    );
  }
);
