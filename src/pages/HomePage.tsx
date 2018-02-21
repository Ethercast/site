import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Link } from 'react-router-dom';
import Auth from '../util/auth-util';

export interface HomePageProps extends RouteComponentProps<{}> {
  loggedIn: boolean;
}

export default connect(
  ({ auth: { loggedIn } }: AppState) => ({ loggedIn })
)(class HomePage extends React.Component<HomePageProps> {
    public render() {
      const { loggedIn } = this.props;

      return (
        <div>
          <Segment inverted textAlign="center" style={{ minHeight: 700, marginTop: '-2em' }} vertical>
            <Container text>
              <Header
                as="h1"
                content="Ethercast"
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '3em',
                }}
              />
              <Header
                as="h2"
                content="Subscribe to events on the ethereum blockchain via webhooks"
                inverted
                style={{
                  fontSize: '1.7em',
                  fontWeight: 'normal',
                  marginTop: '1.5em',
                  marginBottom: '1.5em'
                }}
              />
              <Button
                primary size="huge" as={loggedIn ? Link : null}
                to={loggedIn ? '/subscriptions' : null}
                onClick={() => {
                  if (!loggedIn) {
                    Auth.login();
                  }
                }}
              >
                Get Started
                <Icon name="arrow right"/>
              </Button>
            </Container>
          </Segment>

          <Segment style={{ marginTop: '2em' }} vertical>
            <Grid celled="internally" columns="equal" stackable>
              <Grid.Row textAlign="center">
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as="h3" style={{ fontSize: '2em' }}>"What a Company"</Header>
                  <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    "I shouldn"t have gone with their competitor."
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    Everyone else
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

        </div>
      );
    }
  }
);
