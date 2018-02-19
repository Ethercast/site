import { Button, Card, Label } from 'grommet';
import * as moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Subscription } from '../../util/model';

const CARD_STYLE = {
  border: '1px solid rgba(0,0,0,0.2)',
  height: '100%',
  width: '100%',
  position: 'relative',
  alignContent: 'center',
  paddingBottom: 50,
};

export default withRouter(
  class extends React.Component<RouteComponentProps<{}> & { subscription: Subscription }> {
    render() {
      const { subscription, history } = this.props;

      const styleOverrides = {
        opacity: subscription.status === 'active' ? '1.0' : '0.4',
      };

      const labelStyle = {
        color: subscription.status === 'active' ? '#8cc800' : '#a8a8a8'
      };

      return (
        <Card
          heading={subscription.name}
          label={<Label margin='none'
                        style={labelStyle}>{subscription.status.toUpperCase()}</Label>}
          style={{ ...CARD_STYLE, ...styleOverrides }}
          description={moment(subscription.timestamp).format('l LT')}
        >
          <p>{subscription.description}</p>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '0px',
            right: '0px',
            paddingLeft: '5%'
          }}>
            <Button style={{ width: '90%', alignContent: 'center' }} label="View subscription"
                    onClick={(e: any) => {
                      history.push(`/subscriptions/${subscription.id}`);
                    }}/>
          </div>
        </Card>
      );
    }
  }
);
