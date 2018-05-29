/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';
import React from 'react';
import { SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID } from '../../consts';
import SocialAccounts from './widgets/socialAccounts';
import CurrentAccounts from './currentAccounts';
import RecomendAccounts from './recomendAccounts';
import ProfileAccess from './profileAccess';

const mapStateToProps = state => ({
  isVisible: state.visibilitySettingsMenu === SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID,
  hasRecomendedAccounts: (state.settings.recommendations || []).length > 0,
  currentAccountsTitle: 'Доступные для управления номера и договоры',
  recomendAccountsTitle: 'Рекомендованные к привязке номера',
  profileAccessTitle: 'Эти абоненты могут управлять вашим профилем'
});

class ManageNumbers extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    let recomendAccounts = null;
    if (this.props.hasRecomendedAccounts) {
      recomendAccounts = (
        <div className="has-right-col">
          <div>
            <h3>{this.props.recomendAccountsTitle}</h3>
            <div className="content-block common nopadding borderdashed" style={{ width: '694px' }}>
              <div className="management-contract">
                <RecomendAccounts />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>{this.props.currentAccountsTitle}</h3>
        <div className="sso-settings-page">
          <div className="right-col">
            <SocialAccounts />
          </div>
          <div className="has-right-col">
            <CurrentAccounts />
          </div>
          {recomendAccounts}
          <h3>{this.props.profileAccessTitle}</h3>
          <div className="has-right-col">
            <div>
              <div className="content-main-block" style={{ width: '694px' }}>
                <div className="middle">
                  <ProfileAccess />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ManageNumbers);
