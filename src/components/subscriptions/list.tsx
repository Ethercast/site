import {Tile, Tiles} from 'grommet';
import * as React from 'react';
import * as _ from 'underscore';
import SubscriptionItem from './item';
import { Subscription } from '../../util/model';

export default ({items}: { items: Subscription[] }) => {
  const groupedByStatus = _.groupBy(items, 'status');
  const sortByTime = ({timestamp, status}: Subscription) => timestamp * -1;

  const activeItems = _.sortBy(groupedByStatus['active'], sortByTime);
  const inactiveItems = _.sortBy(groupedByStatus['deactivated'], sortByTime);

  return (
    <Tiles responsive={true} style={{display: 'flex'}}>
      {

        activeItems.concat(inactiveItems).map(
          subscription => {
            return (
              <Tile key={subscription.id} pad='small' basis='1/3'>
                <SubscriptionItem key={subscription.id} subscription={subscription}/>
              </Tile>
            );
          }
        )
      }
    </Tiles>
  );
}
