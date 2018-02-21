import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

export default withRouter(
  class ScrollToTop extends React.Component<RouteComponentProps<{}>> {
    componentDidUpdate(prevProps: RouteComponentProps<{}>) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0);
      }
    }

    render() {
      return null;
    }
  }
);
