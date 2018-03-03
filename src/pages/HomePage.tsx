import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Label, Transition, Button, Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
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
          Get Started <Icon style={{ marginLeft: 8 }} name="arrow right"/>
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
      <Segment piled>
        <Header as="h2" icon textAlign="center" color="black">
          <Icon name={icon}/>
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
              <Label color="red">In beta</Label> :
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
          style={{ minHeight: 700, marginTop: '-2em' }}
          vertical>
          <Container text>
            <Header
              as="h1"
              content="Ethercast"
              inverted
              style={{
                fontFamily: 'Roboto Slab',
                fontSize: '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '3em'
              }}
            />
            <Header
              as="h2"
              content="Subscribe to smart contract events on the Ethereum blockchain via webhooks"
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

        <Header as="h2" textAlign="center" style={{ marginTop: 40, fontSize: '3em' }}>
          Key features
        </Header>

        <Grid columns="equal" stackable padded>
          <Grid.Row textAlign="center">
            <Feature title="Guaranteed delivery" icon="certificate">
              All events are guaranteed to be delivered at least once to each subscription.
              That means you can build systems on top of Ethercast without worrying about
              the reliability of Ethereum nodes or any service listening to events
              from an Ethereum node.
            </Feature>
            <Feature title="Log decoding" icon="microchip" beta>
              We decode events from known contract addresses
              for immediate use in downstream systems like Zapier or IFTTT.
              If the contract is verified on Etherscan, you'll receive the
              decoded data and topics with each event.
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
            <Feature title="Best-effort ordering" icon="sort content ascending">
              Messages are delivered with best-effort ordering. In most cases,
              webhooks will be triggered for logs in the order that they arrive.
              When logs are removed due to a chain reorganization,
              they are sent in reverse order.
            </Feature>
            <Feature title="Testnet support" icon="terminal" comingSoon>
              In addition to the Ethereum mainnet,
              we support the Ropsten, Kovan, and Rinkeby testnets.
            </Feature>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
