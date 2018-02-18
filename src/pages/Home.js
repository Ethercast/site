import { Hero, Box, Heading } from 'grommet';
import React from 'react';
import { Link } from 'react-router-dom';

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
          Contact hello@if-eth.com to learn more
        </Box>
      </Hero>
    );
  }
}
