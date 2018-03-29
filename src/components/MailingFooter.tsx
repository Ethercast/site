import * as React from 'react';
import { Button, Container, Icon, Input, List, Segment } from 'semantic-ui-react';

interface State {
  email: string;
  hide: boolean;
};

export default class MailingFooter extends React.Component<{}, State> {
  state = { email: '', hide: false };

  dismiss = () => {
    this.setState({ hide: true });
  };

  updateEmail = (_: any, { value }: { value: string }) => {
    this.setState({ email: value });
  };

  subscribe = () => {
    const url = `https://ethercast.us12.list-manage.com/subscribe?u=bcdba189ebc2ddf23f14ae273&id=ba729c94d7&MERGE0=${this.state.email}`;
    const succeeded = window.open(url, '_blank', 'noopener');
    if (!succeeded) {
      // this browser does not support or is blocking the popup
      window.location.href = url;
    }
    this.dismiss();
  };

  render() {
    if (this.state.hide) {
      return null;
    }

    return (
      <Segment inverted vertical style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1 }}>
        <Button circular floated="right" icon="close" inverted style={{ marginRight: '1em' }} onClick={this.dismiss}/>
        <Container textAlign="center">
          <List horizontal inverted style={{ textAlign: 'center' }}>
            <List.Item style={{ fontSize: '1.5rem', textAlign: 'left', verticalAlign: 'middle' }}>
              <Icon name="announcement"/> We're in open beta!<br/>
              Get an email when we've got news:
            </List.Item>
            <List.Item style={{ verticalAlign: 'middle' }}>
              <Input action={{ content: 'Subscribe', onClick: this.subscribe }} inverted placeholder="email" onChange={this.updateEmail}/>
            </List.Item>
          </List>
        </Container>
      </Segment>
    );
  }
}
