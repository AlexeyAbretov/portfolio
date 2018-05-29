/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/app';

import createStore from './store';

export default class Entry extends React.Component {
  render() {
    const store = createStore(
      this.props);

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
