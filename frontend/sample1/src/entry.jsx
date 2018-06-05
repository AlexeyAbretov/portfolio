/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import { Provider } from 'react-redux';

import Grid from 'containers/grid';

import LegalPopup from 'containers/popups/legal';
import AntivirPopup from 'containers/popups/antivir';
import InetPopup from 'containers/popups/inet';
import TvPopup from 'containers/popups/tv';
import TvConsolePopup from 'containers/popups/tv/console';
import WifiRouterPopup from 'containers/popups/wifi/router';

import App from './containers/app';

import createStore from './store';

export default class Entry extends React.Component {
  render() {
    const store = createStore(
      this.props);

    return (
      <Provider store={store}>
        <App>
          <Grid />
          <LegalPopup />
          <AntivirPopup />
          <InetPopup />
          <TvPopup />
          <TvConsolePopup />
          <WifiRouterPopup />
        </App>
      </Provider>
    );
  }
}
