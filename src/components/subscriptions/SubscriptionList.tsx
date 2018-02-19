import * as React from 'react';
import * as _ from 'underscore';
import SubscriptionItem from './SubscriptionItem';
import { Subscription } from '../../util/model';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

export default ({ items }: { items: Subscription[] }) => {
  const groupedSorted = _.chain(items)
    .groupBy('status')
    .mapObject(subs => _.sortBy(subs, ({ timestamp }: Subscription) => timestamp * -1))
    .value();

  const active = groupedSorted['active'] || [];
  const inactive = groupedSorted['deactivated'] || [];

  return (
    <Grid stackable columns={4}>
      {

        active.concat(inactive)
          .map(
            (subscription: Subscription) => (
              <Grid.Column key={subscription.id}>
                <SubscriptionItem key={subscription.id} subscription={subscription}/>
              </Grid.Column>
            )
          )
      }
    </Grid>
  );
}
