/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';
import React from 'react';
import { SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID } from '../../consts';
import Credentials from './credentials';
import AccountList from './widgets/socialAccounts';
import RestorePassword from './credentials/restorePassword';

const mapStateToProps = state => ({
  isVisible: state.visibilitySettingsMenu === SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID,
  isMobile: state.credentials.loginData.isMobile,
  manageCredentialTitle: 'Настройка пароля и доступа',
  restorePasswordTitle: 'Восстановление пароля'
});

class ManageCredentials extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }
    let restorePasswordTitle;
    let restorePassword;
    if (this.props.isMobile) {
      restorePasswordTitle = (
        <div>
          <h3>{this.props.restorePasswordTitle}</h3>
        </div>
      );
      restorePassword = (
        <div>
          <div style={{ width: '694px' }}>
            <div className="content-main-block">
              <div className="middle">
                <RestorePassword />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>{this.props.manageCredentialTitle}</h3>
        <div className="sso-settings-page">
          <div className="right-col">
            <AccountList />
          </div>
          <div className="has-right-col">
            <Credentials />
            {restorePasswordTitle}
            {restorePassword}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ManageCredentials);
