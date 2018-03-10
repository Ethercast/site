import * as React from 'react';
import SubscriptionItem from './SubscriptionItem';
import { Subscription } from '../../debt/ethercast-backend-model';
import { Card } from 'semantic-ui-react';

export default ({ items }: { items: Subscription[] }) => {
  return (
    <Card.Group itemsPerRow={4} stackable>
      {
        items.map(
          (subscription: Subscription) => (
            <SubscriptionItem key={subscription.id} subscription={subscription}/>
          )
        )
      }
    </Card.Group>
  );
}
