/* eslint react/no-danger: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';
import PasswordField from 'components/password';

import { OperationStatus, LoginInfoType } from 'consts';
import Utils from 'utils';

import RadioWithLabel from '../radioWithLabel';

import Button from '../../button';
import HideAwaiter from '../../awaiters/hide';

export default class KnownPassword extends React.Component {
  constructor(props) {
    super(props);

    this.GetLoginInfoClick = this.GetLoginInfoClick.bind(this);
    this.OnNumberChange = this.OnNumberChange.bind(this);
    this.OnPasswordChange = this.OnPasswordChange.bind(this);
    this.OnSendRequest = this.OnSendRequest.bind(this);
    this.OnRejectRequest = this.OnRejectRequest.bind(this);
    this.RequestDestinationMobileClick = this.RequestDestinationMobileClick.bind(this);
    this.RequestDestinationFttbClick = this.RequestDestinationFttbClick.bind(this);

    this.state = {
      isAccept: false,
      canPressAccept: !props.canEditNumber,
      canPressSendRequest: false,
      login: props.account.login,
      password: '',
      showAwaiter: false,
      showRequestAwaiter: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginInfoAwaiter && nextProps.loginInfoAwaiter.status === OperationStatus.Success
      && nextProps.loginInfoAwaiter.login === this.state.login) {
      const loginInfo = nextProps.loginInfo[this.state.login] || {};
      const mobileAndFttb = loginInfo.isMobile && loginInfo.isFttb;
      const isMobile = this.state.isMobile == null ? false : this.state.isMobile;
      const isFttb = this.state.isFttb == null ? true : this.state.isFttb;
      this.setState({
        isAccept: true,
        showAwaiter: false,
        isMobile: mobileAndFttb ? isMobile : loginInfo.isMobile,
        isFttb: mobileAndFttb ? isFttb : loginInfo.isFttb
      });
    }
    if (nextProps.reset === true) {
      this.setState({
        isAccept: false,
        canPressAccept: !nextProps.canEditNumber,
        canPressSendRequest: false,
        login: nextProps.account.login ? nextProps.account.login : '',
        password: '',
        showAwaiter: false,
        showRequestAwaiter: false,
        isMobile: undefined,
        isFttb: undefined
      });
    }
  }

  GetLoginInfoClick() {
    if (this.props.getLoginInfo) {
      this.props.getLoginInfo(this.state.login);
      this.setState({
        showAwaiter: this.state.login === this.props.account.login || this.props.canEditNumber === true
      });
    }
  }

  OnNumberChange(e) {
    if (e && e.target && e.target.value) {
      this.setState({ canPressAccept: e.target.value.length > 0, login: e.target.value });
    } else {
      this.setState({ canPressAccept: false, login: '' });
    }
    this.setState({ isAccept: false, showAwaiter: false, showRequestAwaiter: false });
  }

  OnPasswordChange(e) {
    this.setState({ canPressSendRequest: e.length > 0, password: e });
  }

  RequestDestinationMobileClick() {
    this.setState({ isMobile: true, isFttb: false });
  }
  RequestDestinationFttbClick() {
    this.setState({ isMobile: false, isFttb: true });
  }

  OnSendRequest() {
    if (this.props.addAccountToCurrent) {
      let userType = this.state.isMobile === true ? LoginInfoType.B2C : null;
      userType = this.state.isFttb === true ? LoginInfoType.FTTB : userType;
      this.props.addAccountToCurrent(this.state.login, this.state.password, userType);
      this.setState({ showRequestAwaiter: true });
    }
  }

  OnRejectRequest() {
    if (this.props.onRejectRequest) {
      this.props.onRejectRequest();
    }
    this.setState({ isAccept: false });
  }

  render() {
    const texts = this.props.texts.knownPassword;
    const knownPasswordEnable = this.props.showForm ? (
      <div className="bot-option-prefix">
        <span className="topic" dangerouslySetInnerHTML={{ __html: texts.description }} />
      </div>
    ) : null;

    const message = Utils.getAwaiterMessage(this.props.loginInfoAwaiter.status, texts.loginInfoAwaiter);
    const requestMessage = Utils.getAwaiterMessage(this.props.addAccountToCurrentAwaiter.status,
      texts.addAccountToCurrentAwaiter);

    const loginForm = this.props.showForm ? (
      <div className="blck-pass">
        <label htmlFor="#">{texts.enterLogin}</label>
        <div className="input-marks">
          <div className={`input ${this.props.canEditNumber ? '' : 'disabled'}`}>
            <input
              type="text"
              disabled={this.props.canEditNumber ? false : 'disabled'}
              value={this.state.login}
              onChange={this.OnNumberChange}
            />
            <div className="form-tip" style={{ display: 'none' }} />
          </div>
          <Button
            text={texts.confirmLogin}
            cssClass="sub label"
            isDisabled={!this.state.canPressAccept}
            click={this.GetLoginInfoClick}
          />
          <span className="descr italic">{texts.loginDescription}</span>
          <HideAwaiter
            message={message}
            status={this.props.loginInfoAwaiter.status}
            showAwaiter={this.state.showAwaiter}
            hideAwaiter={() => this.setState({ showAwaiter: false })}
          />
        </div>
      </div>
    ) : null;

    const loginInfo = this.props.loginInfo[this.state.login] || {};
    const chooseCabinet = loginInfo.isMobile && loginInfo.isFttb ? (
      <div className="input-marks">
        <div className="black">{texts.loginExist}</div>
        <div className="toggle mtop20">
          <ul>
            <li
              className={this.state.isMobile ? 'active' : ''}
              onClick={this.RequestDestinationMobileClick}
              style={{ width: '92.4px' }}
            >
              <span className="mobile">{texts.mobile}</span>
            </li>
            <li
              className={this.state.isFttb ? 'active' : ''}
              onClick={this.RequestDestinationFttbClick}
              style={{ width: '84px' }}
            >
              <span className="household">{texts.home}</span>
            </li>
          </ul>
        </div>
      </div>
    ) : null;

    const requestForm = this.state.isAccept && this.props.showForm ? (
      <div className="blck-pass">
        {chooseCabinet}
        <label htmlFor="#">{texts.enterPassword}</label>
        <div className="input-marks">
          <PasswordField password={this.state.password} onChange={this.OnPasswordChange} />
        </div>
        <span className="descr">
          <label htmlFor="#">{texts.agreement}</label>
          <div className="submit-or-cancel">
            <Button
              text={texts.add}
              cssClass="sub label"
              isDisabled={!this.state.canPressSendRequest}
              click={this.OnSendRequest}
            />
            <span className="or">или</span>
            <PseudoLink text={texts.reject} click={this.OnRejectRequest} css={{ lh100: true }} />
          </div>
          <HideAwaiter
            message={requestMessage}
            status={this.props.addAccountToCurrentAwaiter.status}
            showAwaiter={this.state.showRequestAwaiter}
            hideAwaiter={() => this.setState({ showRequestAwaiter: false })}
          />
        </span>
      </div>
    ) : null;

    return (
      <li className="option-prefix">
        <RadioWithLabel
          text={texts.title}
          value="1"
          cssClass="top-option-prefix check-prefix"
          checked={this.props.showForm}
          onChange={this.props.onSelect}
        />
        {knownPasswordEnable}
        {loginForm}
        {requestForm}
      </li>
    );
  }
}
