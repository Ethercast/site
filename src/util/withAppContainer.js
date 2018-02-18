import { App } from 'grommet';
import React from 'react';

export default function withAppContainer(Component) {
  return class extends React.Component {
    render() {
      return (
        <App>
          <Component {...this.props}/>
        </App>
      );
    }
  }
}
