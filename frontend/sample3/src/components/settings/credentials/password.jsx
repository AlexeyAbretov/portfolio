/* eslint react/no-danger:0 */
/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';

import { OperationStatus } from 'consts';
import Utils from 'utils';

import Button from 'components/button';
import PasswordField from 'components/password';

import HideAwaiter from '../../awaiters/hide';

const Reliability = {
  Empty: 0,
  Bad: 1,
  Avarage: 2,
  Good: 3,
  Short: 4,
  Long: 5,
};

export default class Password extends React.Component {
  static generatePassword() {
    const fn = () => Array(10).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
      .map(x => (x[Math.floor(Math.random() * x.length)])).join('');
    let password = fn();
    while (Password.getReliability(password) !== Reliability.Good) {
      password = fn();
    }
    return password;
  }
  static getReliability(password) {
    if (password.length < 6) {
      return Reliability.Short;
    }
    if (password.length > 24) {
      return Reliability.Long;
    }
    const result = (/\d/.test(password) ? 1 : 0) + (/[a-z]/.test(password) ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0);
    return result <= 1 ? Reliability.Bad : result;
  }

  constructor(props) {
    super(props);

    this.OnOldPasswordChange = this.OnOldPasswordChange.bind(this);
    this.OnNewPasswordChange = this.OnNewPasswordChange.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);
    this.OnGeneratePassword = this.OnGeneratePassword.bind(this);
    this.OnUseGeneratedPassword = this.OnUseGeneratedPassword.bind(this);

    this.state = {
      showOldPassTip: false,
      showNewPassTip: false,
      password: Password.generatePassword(),
      passwordText: '',
      showAwaiter: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const result = nextProps.changePasswordResult;
    if (result && result.isSucceeded && this.state.resetPassword === true) {
      this.setState({ oldPassword: '', newPassword: '', resetPassword: false, reliability: Reliability.Empty });
    }
  }

  OnSaveClick() {
    if (this.props.changePassword) {
      this.setState({ resetPassword: true, showAwaiter: true });
      this.props.changePassword({
        login: this.props.account.name,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      });
    }
  }

  OnOldPasswordChange(value) {
    this.setState({
      oldPassword: value,
      showOldPassTip: value === '' ? false : !/^[A-Za-z0-9]+$/.test(value)
    });
  }

  OnNewPasswordChange(value) {
    this.setState({
      newPassword: value,
      showNewPassTip: value === '' ? false : !/^[A-Za-z0-9]+$/.test(value),
      reliability: value === '' ? Reliability.Empty : Password.getReliability(value)
    });
  }

  OnGeneratePassword() {
    this.setState({ password: Password.generatePassword() });
  }
  OnUseGeneratedPassword() {
    this.OnNewPasswordChange({ target: { value: this.state.password } });
  }

  render() {
    const canSave = this.state.reliability === Reliability.Good;
    const texts = this.props.texts;

    const reliabilityText = (() => {
      switch (this.state.reliability) {
        case Reliability.Bad:
          return texts.badPasswordText;
        case Reliability.Avarage:
          return texts.avaragePasswordText;
        case Reliability.Good:
          return texts.goodPasswordText;
        case Reliability.Short:
          return texts.shortPasswordText;
        case Reliability.Long:
          return texts.longPasswordText;
        default:
          return '';
      }
    })();

    const checkPasswordCss = (() => {
      switch (this.state.reliability) {
        case Reliability.Avarage:
          return 'average-password';
        case Reliability.Good:
          return 'reliable-password';
        default:
          return 'unreliable-password';
      }
    })();

    const message = Utils.getAwaiterMessage(this.props.changePasswordAwaiter.status, texts.changePasswordAwaiter);

    let noteForShpd;
    if (!this.props.account.isMobile && this.props.changePasswordAwaiter.status === OperationStatus.Success) {
      noteForShpd = (
        <div className="nota-bene-yellow-box message-info-password" style={{ display: 'block' }}>
          <div className="comment-italic valign-middle-cell" dangerouslySetInnerHTML={{ __html: texts.noteVpnText }} />
        </div>
      );
    }

    return (
      <form>
        <div className="form-line newpass" style={{ display: this.props.oldPasswordRequired ? '' : 'none' }}>
          <label htmlFor="oldpass">{texts.currentPasswordText}</label>
          <PasswordField
            password={this.state.oldPassword}
            isError={this.state.showOldPassTip}
            errorText={texts.tipOldPassText}
            onChange={this.OnOldPasswordChange}
          />
        </div>
        <div className="form-line newpass">
          <label htmlFor="newpass">{texts.newPasswordText}</label>
          <PasswordField
            password={this.state.newPassword}
            isError={this.state.showNewPassTip}
            errorText={texts.tipNewPassText}
            onChange={this.OnNewPasswordChange}
          />
          <div className={`notice ${checkPasswordCss}`} style={{ display: this.state.newPassword ? '' : 'none' }}>
            {reliabilityText}
          </div>
        </div>
        <p className="read-italic-black example-newpass">
          {texts.exampleText}
          <span className="dynamic" role="button" tabIndex="0" onClick={this.OnUseGeneratedPassword}>
            {this.state.password}
          </span>
          <span className="icon-refresh" role="button" tabIndex="0" onClick={this.OnGeneratePassword} />
        </p>
        <p className="read-italic read-newpass" dangerouslySetInnerHTML={{ __html: texts.notePasswordText }} />
        {noteForShpd}
        <div className="block change-password-message">
          <HideAwaiter
            message={message}
            status={this.props.changePasswordAwaiter.status}
            showAwaiter={this.state.showAwaiter}
            hideAwaiter={() => this.setState({ showAwaiter: false })}
          />
        </div>
        <div className="submit inline-block change-data">
          <Button text={texts.saveText} cssClass="sub label" isDisabled={!canSave} click={this.OnSaveClick} />
        </div>
      </form>
    );
  }
}
