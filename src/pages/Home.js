import { Box, Heading, Hero } from 'grommet';
import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Hero>
          <Box direction='row'
               justify='center'
               align='center'>
            <Box basis='1/2'
                 align='end'
                 pad='medium'/>
            <Box basis='1/2'
                 align='start'
                 pad='medium'>
              <Heading margin='none'>
                if-eth
              </Heading>
            </Box>
          </Box>
        </Hero>
      </div>
    );
  }
}
