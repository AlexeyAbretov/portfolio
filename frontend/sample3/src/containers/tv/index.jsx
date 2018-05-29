/* eslint  react/prefer-stateless-function: 0 */
import React from 'react';
import { connect } from 'react-redux';

import {
  TOP_MENU_TV_ITEM_ID
} from 'consts';

import ChangeTvPopup from './info/popups/change';
import ChangeTvPacketsPopup from './packets/popups/change';

import Info from './info';
import Packages from './packets';
import Services from './services';
import Devices from './devices';

const mapStateToProps = state => ({
  isVisible: state.visibilityTopMenu === TOP_MENU_TV_ITEM_ID
});

class Tv extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div>
        <Info />
        <Packages />
        <Devices />
        <Services />
        <ChangeTvPopup />
        <ChangeTvPacketsPopup />
      </div>
    );
  }
}

export default connect(
    mapStateToProps
)(Tv);
