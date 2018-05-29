/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';
import React from 'react';
import Menu from './settingsMenu';
import ManageNumbers from './manageNumbers';
import ManageNotifications from './manageNotifications';
import ManageCredentials from './manageCredentials';

import { TOP_MENU_SETTINGS_ITEM_ID } from '../../consts';

const mapStateToProps = state => ({
  isVisible: state.visibilityTopMenu === TOP_MENU_SETTINGS_ITEM_ID
});

class Settings extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div className="content-wrap">
        <h2>Настройки</h2>
        <Menu />
        <ManageNumbers />
        <ManageNotifications />
        <ManageCredentials />
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Settings);
