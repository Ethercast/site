import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import React from 'react';
import _ from 'underscore';
import SubscriptionItem from './item';

export default ({ items, style }) => {
  return (
    <Tiles>
      {
        _.sortBy(items, ({ timestamp }) => timestamp * -1)
          .map(
            subscription => {
              return (
                <Tile key={subscription.id} pad='small' style={{paddingLeft: '0px'}} basis='1/3'>
                  <SubscriptionItem key={subscription.id} subscription={subscription}/>
                </Tile>
              )
            }
          )
      }
    </Tiles>
  );
}
