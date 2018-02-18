import { Button } from 'grommet';
import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(
  ({ subscription, history }) => {
    return (
      <Card
        heading={subscription.name}
        description={`Created at: ${moment(subscription.timestamp).format('l LT')}`}>
        <Paragraph>{subscription.description}</Paragraph>
        <Button label="View subscription" onClick={e => {
          history.push(`/subscriptions/${subscription.id}`);
        }}/>
      </Card>
    );
  }
);
