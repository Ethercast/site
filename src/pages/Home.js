import { Box, Button, Heading, Hero, Section, Tile, Tiles, Anchor } from 'grommet';
import Value from 'grommet/components/Value';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Auth from '../util/auth';
import withAppContainer from '../util/withAppContainer';

export default withRouter(
  connect(
    ({ auth: { loggedIn } }) => ({ loggedIn })
  )(
    class Home extends React.Component {
      render() {
        const { loggedIn, history } = this.props;

        const BoxWithAppContainer = withAppContainer(Box);

        const CtaButton = (props) => (<Button
          label={loggedIn ? 'Get started' : 'Sign up'}
          primary={true}
          style={{ width: '200px' }}
          onClick={() => {
            if (!loggedIn) {
              Auth.login();
            } else {
              history.push(`/subscriptions/`);
            }
          }}
          {...props}
        />)

        return (
          <div>
            <Hero>
              <BoxWithAppContainer direction='column' justify='center' align='center'>
                <Box direction='row' justify='center' align='center'>
                  <Box basis='1/2' align='center' pad='medium'>
                    <img alt="hero" src='/hero.png'/>
                  </Box>
                  <Box direction='column' justify='left' align='left'>
                    <Heading margin='none'>
                      Get notified when your smart contracts emit events
                    </Heading>
                    <Heading tag='h4' margin='small'>
                      and cut through the noise with robust, realtime filtering
                    </Heading>
                    <Box basis='xsmall' align='left' pad='small' alignContent='start'
                         style={{ paddingLeft: '0px' }}>
                      <CtaButton />
                    </Box>
                  </Box>
                </Box>
                <p></p>
              </BoxWithAppContainer>
            </Hero>
            <Section direction='column' justify='center' align='center' colorIndex='brand' style={{
              height: '200px',
              fontFamily: 'Work Sans,Arial,sans-serif'
            }}>
              <Box direction='row' justify='center' align='center'>
                <Heading style={{ marginLeft: '25px', marginRight: '25px', marginBottom: '25px' }}
                         tag="h2">
                  Getting started is easy
                </Heading>
              </Box>
              <Tiles direction='row' justify='center' align='center' pad='large'>
                <Tile style={{ marginLeft: '25px', marginRight: '25px' }}>
                  <Value value={'1.'}
                         label='Find a contract'
                  />
                </Tile>
                <Tile style={{ marginLeft: '25px', marginRight: '25px' }}>
                  <Value value={'2.'}
                         label='Create a subscription'
                  />
                </Tile>
                <Tile style={{ marginLeft: '25px', marginRight: '25px' }}>
                  <Value value={'3.'}
                         label='Get notified via webhooks'
                  />
                </Tile>
              </Tiles>
            </Section>
            <Section>
              <BoxWithAppContainer basis='1/2' direction='row' justify='start' align='start' pad='medium' >
                <img alt="hero" src='/laptop.png' style={{ height: '300px', width: 'auto' }}/>
                <Box basis='1/2' direction='column' justify='start' align='start' pad='medium' >
                  <Heading style={{ marginLeft: '25px', marginRight: '25px', marginBottom: '25px' }}
                           tag="h2">
                           Highlighted Features
                  </Heading>
                  <ul>
                    <li><Heading tag='h4'>Simple custom filtering of events by address, method signature, and arguments</Heading></li>
                    <li><Heading tag='h4'>Webhook-based setup for quick integration with services like <Anchor href='https://zapier.com' >Zapier</Anchor> and <Anchor href='https://slack.com' >Slack</Anchor></Heading></li>
                  </ul>
                  <CtaButton style={{ marginLeft: '25px', marginRight: '25px', marginBottom: '25px' }} />
                </Box>
              </BoxWithAppContainer>
            </Section>
          </div>
        );
      };
    }
  )
);
