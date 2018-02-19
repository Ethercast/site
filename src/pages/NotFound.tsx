import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default function NotFound(props: RouteComponentProps<{}>) {
  return (
    <div>
      <h2>404</h2>
      <p>
        The URL you have requested was not found.
      </p>
    </div>
  );
}
