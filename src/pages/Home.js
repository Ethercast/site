import { Box, Heading, Hero } from 'grommet';
import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <Hero>
        <Box direction='row' justify='center' align='center'>
          <Box basis='1/2' align='center' pad='medium'>
            <img src='/hero.png' />
            <Heading margin='none'>
              Get notified when your smart contracts emit events.
            </Heading>
          </Box>
        </Box>
        <Box direction='row' justify='center' align='bottom'>
          Contact&nbsp;<a href="mailto:hello@if-eth.com">hello@if-eth.com</a>&nbsp;to learn more
        </Box>
      </Hero>
    );
  }
}
