import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Container, Grid, Header, Icon, Label, Segment, Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import { Link } from 'react-router-dom';
import Auth from '../util/auth-util';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs';

export interface HomePageProps extends RouteComponentProps<{}> {
  loggedIn: boolean;
}

const GetStarted = connect(
  ({ auth: { loggedIn } }: AppState) => ({ loggedIn })
)(
  function ({ loggedIn }) {
    return (
      <Button
        primary
        size="huge"
        as={loggedIn ? Link : null}
        to={loggedIn ? '/subscriptions' : null}
        onClick={() => {
          if (!loggedIn) {
            Auth.login();
          }
        }}>
        <Button.Content>
          {loggedIn ? 'Get started' : 'Sign up'} <Icon style={{ marginLeft: 8 }} name="arrow right"/>
        </Button.Content>
      </Button>
    );
  }
);

interface FeatureProps {
  comingSoon?: boolean;
  beta?: boolean;
  icon: SemanticICONS;
  title: string;
  children: any;
}

const Feature = ({ icon, title, children, comingSoon = false, beta = false }: FeatureProps) => (
  <Grid.Column>
    <Transition transitionOnMount animation="fade up">
      <Segment raised>
        <Header as="h2" icon textAlign="center" color="black">
          <Icon name={icon} circular inverted color="blue"/>
          <Header.Content>
            {title}
          </Header.Content>
        </Header>

        <p style={{ fontSize: '1.33em' }}>
          {children}
        </p>

        <div style={{ textAlign: 'center' }}>
          {
            comingSoon ?
              <Label color="blue">Coming soon</Label> :
              null
          }
          {
            beta ?
              <Label color="yellow">BETA</Label> :
              null
          }
        </div>
      </Segment>
    </Transition>
  </Grid.Column>
);

export default class HomePage extends React.Component<HomePageProps> {
  public render() {
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: '80vh', marginTop: '-2em', display: 'flex', alignItems: 'center' }}
          vertical>
          <Container text>
            <Header
              as="h1"
              content="Ethercast"
              inverted
              style={{
                fontFamily: 'Roboto Slab',
                fontSize: '4em',
                fontWeight: 'normal'
              }}
            />
            <Header
              as="h2"
              content="Subscribe to anything that happens on the Ethereum blockchain"
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                marginTop: '1.5em',
                marginBottom: '1.5em'
              }}
            />
            <GetStarted/>
          </Container>
        </Segment>

        <Header
          as="h2"
          textAlign="center"
          style={{ marginTop: 40, fontSize: '3em' }}
        >
          Key features
        </Header>

        <Container>
          <Grid columns="equal" stackable padded>
            <Grid.Row textAlign="center">
              <Feature title="Event decoding" icon="microchip">
                Ethercast decodes events logged by contracts and transactions sent to contracts
                that have verified source on Etherscan for immediate use in downstream systems
                like Zapier or IFTTT.
                If the contract is verified on <a href="https://etherscan.io" target="_blank">Etherscan</a>, you'll
                receive the decoded data and topics with each log and transaction in the <code>ethercast</code> key
              </Feature>
              <Feature title="Latency" icon="feed">
                We guarantee 99% of events to be delivered once within 5 minutes of the block
                timestamp. Around half of the messages will arrive within 1 minute.
              </Feature>
            </Grid.Row>
            <Grid.Row>
              <Feature title="Smart forking" icon="fork">
                When a chain reorganization occurs, we send you the same logs again
                with the <code>removed</code> flag so you can revert
                any downstream effects.
              </Feature>
              <Feature title="Testnet support" icon="terminal">
                In addition to our deployment on the <a href="https://ethercast.io">Ethereum mainnet</a>,
                we are also deployed on the <a href="https://kovan.ethercast.io">Kovan testnet</a>. We intend
                to support all the same testnets as Etherscan.
              </Feature>
            </Grid.Row>
            <Grid.Row>
              <Feature title="API access" icon="fork" comingSoon>
                Integrate....
              </Feature>
              <Feature title="" icon="terminal" comingSoon>

              </Feature>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
