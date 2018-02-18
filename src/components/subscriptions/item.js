import Card from 'grommet/components/Card';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default ({ subscription }) => {
  return (
    <div>
      <Card
        label={subscription.webhookUrl}
        heading={<Link to={`/subscriptions/${subscription.id}`}>{subscription.name}</Link>}
        description={`Created At: ${moment(subscription.timestamp).format('l LT')}`}
      >
        {subscription.description}
      </Card>
    </div>
  );
}
