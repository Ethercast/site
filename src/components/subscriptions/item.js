import { Button } from 'grommet';
import Card from 'grommet/components/Card';
import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(
  ({ subscription, history }) => {
    const cardStyle = {
      border: '1px solid rgba(0,0,0,0.2)',
      height: '100%',
      width: '100%',
      position: 'relative',
      alignContent: 'center',
      paddingBottom: '50px',
   }
    return (
      <Card
        heading={subscription.name}
        label={subscription.status}
        style={cardStyle}
        description={moment(subscription.timestamp).format('l LT')}
      >
        <p>{subscription.description}</p>
        <div style={{ position: 'absolute', bottom: '10px', left: '0px', right: '0px', paddingLeft: '5%' }} >
          <Button style={{ width: '90%', alignContent:'center' }} label="View subscription" onClick={e => {
            history.push(`/subscriptions/${subscription.id}`);
          }}/>
        </div>
      </Card>
    );
  }
);
