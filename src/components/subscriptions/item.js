import React from 'react';
import Card from 'grommet/components/Card';

export default ({ subscription }) => {
  return (
    <div>
      <Card
        label={subscription.webhookUrl}
        heading={subscription.name}
        description={`Created At: ${subscription.timestamp}`}
      >
        content
      </Card>
    </div>
  );
}
