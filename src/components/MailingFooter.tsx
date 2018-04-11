import * as React from 'react';
import { Button, Container, Icon, List, Segment } from 'semantic-ui-react';

interface State {
  hide: boolean;
};

export default class MailingFooter extends React.Component<{}, State> {
  state = { hide: false };

  dismiss = () => {
    this.setState({ hide: true });
  };

  subscribe = () => {
    const url = 'https://groups.google.com/a/ethercast.io/forum/?nomobile=true#!forum/updates/join';
    const succeeded = window.open(url, 'noopener');
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
      <Segment inverted vertical style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1, backgroundColor: '#2185d0' }}>
        <Button circular floated="right" icon="close" inverted style={{ marginRight: '1em' }} onClick={this.dismiss}/>
        <Container textAlign="center">
          <List horizontal inverted style={{ textAlign: 'center' }}>
            <List.Item style={{ fontSize: '1.5rem', textAlign: 'left', verticalAlign: 'middle' }}>
              <Icon name="announcement"/> We're in open beta! Get an email when we've got news.
            </List.Item>
            <List.Item style={{ verticalAlign: 'middle' }}>
              <Button inverted content='Subscribe' onClick={this.subscribe}/>
            </List.Item>
          </List>
        </Container>
      </Segment>
    );
  }
}
