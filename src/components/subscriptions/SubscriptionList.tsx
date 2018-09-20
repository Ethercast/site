import * as React from 'react';
import SubscriptionItem from './SubscriptionItem';
import { EthercastTypes } from '@ethercast/model';
import { Card } from 'semantic-ui-react';

export default ({ items }: { items: EthercastTypes.Subscription[] }) => {
  return (
    <Card.Group itemsPerRow={3} stackable>
      {
        items.map(
          (subscription: EthercastTypes.Subscription) => (
            <SubscriptionItem key={subscription.id} subscription={subscription}/>
          )
        )
      }
    </Card.Group>
  );
}
