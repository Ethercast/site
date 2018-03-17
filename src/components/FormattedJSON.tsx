import * as React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

export default class FormattedJSON extends React.PureComponent<{ object: object }> {
  render() {
    const { object } = this.props;
    return (
      <Segment secondary>
        <pre>{JSON.stringify(object, null, 2)}</pre>
      </Segment>
    );
  }
}