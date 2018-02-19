import { Tile, Tiles } from 'grommet';
import * as React from 'react';
import * as _ from 'underscore';
import SubscriptionItem from './SubscriptionItem';
import { Subscription } from '../../util/model';

export default ({ items }: { items: Subscription[] }) => {
  const groupedSorted = _.chain(items)
    .groupBy('status')
    .mapObject(subs => _.sortBy(subs, ({ timestamp }: Subscription) => timestamp * -1))
    .value();

  const active = groupedSorted['status'] || [];
  const inactive = groupedSorted['deactivated'] || [];

  return (
    <Tiles responsive={true} style={{ display: 'flex' }}>
      {

        active.concat(inactive)
          .map(
            (subscription: Subscription) => (
              <Tile key={subscription.id} pad='small' basis='1/3'>
                <SubscriptionItem key={subscription.id} subscription={subscription}/>
              </Tile>
            )
          )
      }
    </Tiles>
  );
}
