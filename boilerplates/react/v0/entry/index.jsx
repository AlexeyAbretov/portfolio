import React from 'react';
import { Provider } from 'react-redux';

import App from 'src/containers/app';

import createStore from 'src/store';

export default (props) => {
  const store = createStore(
    props
  );

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
