import { Box, Heading, Hero, Section, Tiles, Tile, Button } from 'grommet';
import React from 'react';
import withAppContainer from '../util/withAppContainer';
import Value from 'grommet/components/Value';
import LinkUp from 'grommet/components/icons/base/LinkUp';
import Globe from 'grommet/components/icons/base/Globe';

export default class Home extends React.Component {
  render() {
    const BoxWithAppContainer = withAppContainer(Box);
    return (
      <div>
        <Hero>
          <BoxWithAppContainer direction='column' justify='center' align='center'>
            <Box direction='row' justify='center' align='center'>
              <Box basis='1/2' align='center' pad='medium'>
                <img src='/hero.png' />
              </Box>
              <Box direction='column' justify='left' align='left'>
                <Heading margin='none'>
                  Get notified when your smart contracts emit events
                </Heading>
                <Heading tag='h4' margin='small'>
                  and cut through the noise with robust, realtime filtering
                </Heading>
                <Box basis='xsmall' align='left' pad='small' alignContent='start' style={{paddingLeft: '0px'}}>
                  <Button label={'Sign up'} primary={true} onClick={() => {}} style={{width: '200px'}} />
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
            <Heading style={{marginLeft: '25px', marginRight: '25px', marginBottom: '25px'}} tag="h2">
              Getting started is easy
            </Heading>
          </Box>
          <Tiles direction='row' justify='center' align='center' pad='large'>
            <Tile style={{marginLeft: '25px', marginRight: '25px', }}>
              <Value value={'1.'}
                label='Find a contract'
              />
            </Tile>
            <Tile style={{marginLeft: '25px', marginRight: '25px', }}>
              <Value value={'2.'}
                label='Create a subscription'
              />
            </Tile>
            <Tile style={{marginLeft: '25px', marginRight: '25px', }}>
            <Value value={'3.'}
              label='Get notified via webhooks'
            />
            </Tile>
          </Tiles>

        </Section>
      </div>
    )
  };
};
