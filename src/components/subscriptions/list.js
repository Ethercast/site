import React from 'react';
import SubscriptionItem from './item';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

export default ({ items, style }) => {
  return (
    <Tiles>
      {
        items.map(subscription => {
          return (
            <Tile>
              <SubscriptionItem key={subscription.id} subscription={subscription} />
            </Tile>
          );
        })
      }
    </Tiles>
  );
}
