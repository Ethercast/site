import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default ({ subscription }) => {
  return (
    <Link to={`/subscriptions/${subscription.id}`}>
      <Card
        heading={subscription.name}
        description={`Created at: ${moment(subscription.timestamp).format('l LT')}`}
      >
        <Paragraph>{subscription.description}</Paragraph>
      </Card>
    </Link>
  );
}
