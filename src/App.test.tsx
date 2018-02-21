import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import makeStore from './util/makeStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={makeStore()}>
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
