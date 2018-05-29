/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint jsx-a11y/label-has-for:0 */
/* eslint no-script-url:0 */

import React from 'react';
import { RedirectLinks, OperationStatus, SocialType } from '../../consts';
import HideAwaiter from '../awaiters/hide';
import Utils from '../../utils';

export default class SocialAccount extends React.Component {
  constructor(props) {
    super(props);

    this.deleteClick = this.deleteClick.bind(this);
    this.redirectBalance = this.redirectBalance.bind(this);
    this.addSocialAccount = this.addSocialAccount.bind(this);
  }

  deleteClick() {
    if (this.props.deleteSocialAccount) {
      this.props.deleteSocialAccount(this.props.account.socialId);
    }
  }

  redirectBalance() {
    let code = this.props.socialType === SocialType.FB ? RedirectLinks.FbBalance : null;
    code = this.props.socialType === SocialType.VK ? RedirectLinks.VkBalance : null;
    const link = this.props.shared.redirectLinks.filter(x => x.code === code)[0];
    window.open(link);
  }

  addSocialAccount() {
    let code = this.props.socialType === SocialType.FB ? RedirectLinks.SocNetworkUrlFb : null;
    code = this.props.socialType === SocialType.VK ? RedirectLinks.SocNetworkUrlVk : null;
    const link = this.props.shared.redirectLinks.filter(x => x.code === code)[0];
    window.open(link);
  }

  render() {
    const texts = this.props.texts;

    if (this.props.account == null || this.props.account.socialId == null) {
      return (
        <div className="submit" onClick={this.addSocialAccount}>
          <span className=" button sub label">
            <label>{texts.add}</label>
          </span>
        </div>
      );
    }

    const message = Utils.getAwaiterMessage(this.props.socialAwaiter.status, texts.socialAwaiter);
    const showAwaiter = this.props.socialAwaiter.status === OperationStatus.Pending
      || this.props.socialAwaiter.status === OperationStatus.Fail;

    return (
      <div>
        <div className={`item ${
          this.props.socialType === SocialType.FB ? 'facebook' : 'vk'} ${
          this.props.socialAwaiter.status === OperationStatus.Pending ? 'loading-in-active' : ''}`}
        >
          <img src={`data:image/jpeg;base64,${this.props.account.photo}`} alt="" />
          <div className="name">{this.props.account.name}</div>
          <div className="net-name">
            <a href="javascript:void(0)" onClick={this.redirectBalance}>{texts.balance}</a>
          </div>
          <a href="javascript:void(0)" className="delete" onClick={this.deleteClick}>{texts.delete}</a>
        </div>
        <HideAwaiter
          status={this.props.socialAwaiter.status}
          message={message}
          showAwaiter={showAwaiter}
        />
      </div>
    );
  }
}
