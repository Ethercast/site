import * as React from 'react';
import * as _ from 'underscore';
import SubscriptionItem from './SubscriptionItem';
import { Subscription } from '../../util/model';
import { Card } from 'semantic-ui-react';
import ClientPaginated from '../ClientPaginated';

export default ({ items }: { items: Subscription[] }) => {
  const groupedSorted = _.chain(items)
    .groupBy('status')
    .mapObject(subs => _.sortBy(subs, ({ timestamp }: Subscription) => timestamp * -1))
    .value();

  const active = groupedSorted['active'] || [];
  const inactive = groupedSorted['deactivated'] || [];

  return (
    <ClientPaginated
      items={active.concat(inactive)}
      pageSize={12}>
      {
        items => (
          <Card.Group itemsPerRow={4} stackable>
            {
              items.map(
                (subscription: Subscription) => (
                  <SubscriptionItem key={subscription.id} subscription={subscription}/>
                )
              )
            }
          </Card.Group>
        )
      }
    </ClientPaginated>
  );
}
