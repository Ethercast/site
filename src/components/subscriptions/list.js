import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import React from 'react';
import _ from 'underscore';
import SubscriptionItem from './item';

export default ({ items, style }) => {
  const groupedByStatus = _.groupBy(items, 'status');
  const sortByTime = ({ timestamp, status  }) => timestamp * -1;

  const activeItems = _.sortBy(groupedByStatus['active'], sortByTime);
  const inactiveItems = _.sortBy(groupedByStatus['deactivated'], sortByTime);

  return (
    <Tiles responsive={true} style={{ display:'flex' }}>
      {

          activeItems.concat(inactiveItems).map(
            subscription => {
              return (
                <Tile key={subscription.id} pad='small' basis='1/3'>
                  <SubscriptionItem key={subscription.id} subscription={subscription}/>
                </Tile>
              )
            }
          )
      }
    </Tiles>
  );
}
