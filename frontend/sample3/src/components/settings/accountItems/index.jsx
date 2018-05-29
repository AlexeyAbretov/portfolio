/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import AccountItem from './accountItem';
import OutgoingRequest from './outgoingRequest';
import IncomingInvites from './incomingInvites';
import HideAwaiter from '../../awaiters/hide';
import { OperationStatus } from '../../../consts';
import Utils from '../../../utils';

export default class AccountItems extends React.Component {
  constructor(props) {
    super(props);

    this.OnToggleEditAccountClick = this.OnToggleEditAccountClick.bind(this);
    this.OnChangeActiveAccountClick = this.OnChangeActiveAccountClick.bind(this);
    this.OnSaveChangeActiveAccountClick = this.OnSaveChangeActiveAccountClick.bind(this);

    this.state = { toggleEditAccount: {}, activeLogin: undefined, showAwaiter: true };
  }

  OnToggleEditAccountClick(toggleEditAccount) {
    if (toggleEditAccount.toggle === true) {
      this.setState({ toggleEditAccount });
    } else {
      this.setState({ toggleEditAccount: {} });
    }
  }
  OnChangeActiveAccountClick(login, isActive) {
    const ussLogin = this.props.items[0].name === login
      ? this.props.items[1].name
      : this.props.items[0].name;
    const activeLogin = isActive ? login : ussLogin;
    this.setState({ activeLogin });
  }
  OnSaveChangeActiveAccountClick() {
    if (this.props.changeDefaultSsoLoginClick) {
      this.props.changeDefaultSsoLoginClick(this.state.activeLogin);
      this.setState({ toggleEditAccount: {} });
    }
  }

  render() {
    const texts = this.props.texts;
    const accountsLength = this.props.items.length;
    const items = this.props.items.map(x =>
      (<AccountItem
        key={x.ctn}
        {...x}
        sharedData={this.props.sharedData}
        accountsLength={accountsLength}
        toggleEditAccount={this.state.toggleEditAccount.ctn === x.ctn ? this.state.toggleEditAccount.toggle : false}
        manageAccountClick={this.props.manageAccountClick}
        changePasswordClick={this.props.changePasswordClick}
        messageClick={this.props.messageClick}
        blockNumberClick={this.props.blockNumberClick}
        deleteAccountClick={this.props.deleteAccountClick}
        toggleEditAccountClick={this.OnToggleEditAccountClick}
        changeActiveAccountClick={this.OnChangeActiveAccountClick}
        saveChangeActiveAccountClick={this.OnSaveChangeActiveAccountClick}
        texts={texts.accountItem}
      />)
    );

    const incomingInvites = this.props.incomingInvites.map(x =>
      (
        <IncomingInvites
          key={x.initiatorName}
          number={x.initiatorName}
          awaiter={x.awaiter}
          acceptInvite={this.props.acceptInvite}
          rejectInvite={this.props.rejectInvite}
          texts={texts.incomingInvites}
        />
      )
    );

    const outgoingRequests = this.props.outgoingRequests.map(x =>
      (
        <OutgoingRequest
          key={x.destinationName}
          number={x.destinationName}
          awaiter={x.awaiter}
          cancelRequest={this.props.cancelRequest}
          texts={texts.outgoingRequest}
        />
      )
    );

    const message = Utils.getAwaiterMessage(this.props.addAccountToCurrentAwaiter.status,
      texts.addAccountToCurrentAwaiter);
    const showAwaiter = this.props.addAccountToCurrentAwaiter.status === OperationStatus.Success;
    const showAllowAccess = this.props.incomingInvites.length > 0
      || this.props.outgoingRequests.length > 0
      || (showAwaiter && this.state.showAwaiter);

    return (
      <div className="management-contract">
        {items}
        <div className="allow-access" style={{ display: showAllowAccess ? '' : 'none' }}>
          {incomingInvites}
          {outgoingRequests}
          <HideAwaiter
            message={message}
            status={this.props.addAccountToCurrentAwaiter.status}
            showAwaiter={showAwaiter && this.state.showAwaiter}
            hideAwaiter={() => this.setState({ showAwaiter: false })}
          />
        </div>
        <div
          className="valign-middle-cell read"
          style={{ display: accountsLength <= 1 ? '' : 'none', padding: '0px 10px 0px 25px' }}
          dangerouslySetInnerHTML={{ __html: texts.note }}
        />
      </div>
    );
  }
}
