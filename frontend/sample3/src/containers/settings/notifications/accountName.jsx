import React from 'react';
import { connect } from 'react-redux';
import Utils from 'utils';

const mapStateToProps = state => ({
  titleText: 'Аккаунт',
  account: (state.settings.manageAccounts || []).filter(x => x.ssoLoginDefault === true)[0],
});

const AccountName = props => (
  <div className="edit-channel fam-name">
    <div className="edit-left-col">
      <label htmlFor="#">
        <h5>{props.titleText}</h5>
      </label>
    </div>
    <div className="edit-center-col">
      <span>{props.account ? Utils.getLoginTitleString(props.account.ctn) : ''}</span>
      <span className="comment-italic" style={{ marginLeft: '10px' }}>{props.account ? props.account.alias : ''}</span>
    </div>
  </div>
);

export default connect(
    mapStateToProps
  )(AccountName);
