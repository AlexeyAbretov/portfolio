/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';
import React from 'react';
import { SETTINGS_MENU_NOTIFICATIONS_ITEM_ID } from '../../consts';
import SocialAccounts from './widgets/socialAccounts';
import Notifications from './notifications';
import ManageIpTv from './notifications/manageIpTv';

const mapStateToProps = state => ({
  isVisible: state.visibilitySettingsMenu === SETTINGS_MENU_NOTIFICATIONS_ITEM_ID,
  showManageIpTv: (state.manageIpTv.consoles || []).length > 0,
  notoficationsTitle: 'Уведомления по электронной почте и SMS о домашних событиях',
  manageIpTvTitle: 'Настройка уведомлений на ТВ-приставку'
});

class ManageNotifications extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    let manageIpTvTitle;
    let manageIpTv;
    if (this.props.showManageIpTv === true) {
      manageIpTvTitle = (
        <h3 className="header-margin-top">
          <b>{this.props.manageIpTvTitle}</b>
        </h3>);
      manageIpTv = (
        <div className="has-right-col has-right-col_custom">
          <div>
            <div className="content-block common nopadding">
              <ManageIpTv />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>{this.props.notoficationsTitle}</h3>
        <div className="sso-settings-page">
          <div className="right-col">
            <SocialAccounts />
          </div>
          <div className="has-right-col">
            <Notifications />
            {manageIpTvTitle}
            {manageIpTv}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ManageNotifications);
