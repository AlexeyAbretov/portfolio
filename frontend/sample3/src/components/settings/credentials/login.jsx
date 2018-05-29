/* eslint no-script-url:0 */
/* eslint react/no-danger:0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import { RedirectLinks, OperationStatus } from 'consts';
import Utils from 'utils';

import Button from '../../button';
import HideAwaiter from '../../awaiters/hide';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.OnRejectClick = this.OnRejectClick.bind(this);
    this.OnChange = this.OnChange.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);
    this.RedirectToPaymentClick = this.RedirectToPaymentClick.bind(this);

    this.state = {
      valid: false,
      tipText: this.props.texts.tipNewLogin,
      login: '',
      startValidate: false
    };
  }

  OnSaveClick() {
    if (this.props.changeLogin) {
      this.props.changeLogin({ alias: this.state.login, isNotificationVisible: false });
    }
  }

  OnRejectClick() {
    this.setState({ valid: false, login: '', startValidate: false });
  }

  OnChange(e) {
    const login = e.target.value;
    const validLength = login.length >= 5 && login.length <= 20;
    const validCharacters = /^[a-z0-9]+$/.test(login) && /^[a-z]+$/.test(login[0]);
    const valid = validLength && validCharacters;
    const tipText = login.length === 0 ? this.props.texts.tipNewLogin : this.props.texts.tipEditLogin;
    if (e && e.target && e.target.value) {
      this.setState({ tipText, valid, login: e.target.value, startValidate: true });
    } else {
      this.setState({ tipText, valid, login: '', startValidate: true });
    }
  }

  RedirectToPaymentClick() {
    const link = this.props.shared.redirectLinks.filter(x => x.code === RedirectLinks.ReconfigureConnection)[0];
    window.open(link);
  }

  render() {
    const { texts, account, changeLoginAwaiter } = this.props;

    if (account.isMobile) {
      return (
        <form>
          <div className="form-line" >
            <label htmlFor="login">{texts.login}</label>
            <div className="inline-block black not-alias">
              {account.ctn}
            </div>
          </div>
        </form>
      );
    }

    if (account.alias) {
      return (
        <form>
          <div className=" form-line">
            <label htmlFor="login">{texts.currentLogin}</label>
            <div className="inline-block black not-alias">{account.alias}</div>
            <div
              className="nota-bene-dashed-box success mleft149"
              style={{ marginBottom: '15px', display: account.isNotificationVisible ? '' : 'none' }}
            >
              <span dangerouslySetInnerHTML={{ __html: texts.notifSuccess1 }} />
              <a href="javascript:void(0)" onClick={this.RedirectToPaymentClick}>{texts.notifSuccessLink}</a>
              <span dangerouslySetInnerHTML={{ __html: texts.notifSuccess2 }} />
            </div>
          </div>
        </form>
      );
    }

    const showTip = !this.state.valid && this.state.startValidate;
    const message = Utils.getAwaiterMessage(changeLoginAwaiter.status, texts.changeLoginAwaiter);
    const ctn = Utils.getLoginTitleString(account.name);

    return (
      <form>
        <div className="form-line">
          <label htmlFor="login">{texts.currentLogin}</label>
          <div className="inline-block black not-alias">{ctn}</div>
        </div>
        <div className="form-line" style={{ marginTop: '4px' }}>
          <label htmlFor="newlogin">{texts.newLogin}</label>
          <div
            className={`input new-alias ${showTip ? 'errorField' : ''}`}
            data-bind="validationElement:NewAlias"
          >
            <input type="text" value={this.state.login} onChange={this.OnChange} />
            <div className="form-tip" style={{ display: showTip ? 'block' : 'none' }}>
              {this.state.tipText}
            </div>
          </div>
        </div>
        <p className="comment-italic">{texts.noteInfoLogin}</p>
        <div className="nota-bene-yellow-box block">
          <span className="read">{texts.noteChangeLogin}</span>
        </div>
        <div style={{ marginLeft: '149px' }}>
          <HideAwaiter
            status={changeLoginAwaiter.status}
            message={message}
            showAwaiter={changeLoginAwaiter.status !== OperationStatus.Success}
          />
        </div>
        <div className="submit submit-or-cancel inline-block submit-or-cancel_after">
          <Button
            text={texts.save}
            cssClass="sub label"
            isDisabled={!this.state.valid}
            click={this.OnSaveClick}
          />
        </div>
        <span>
          &nbsp;или&nbsp;
          <PseudoLink text={texts.reject} css={{ lh100: true }} click={this.OnRejectClick} />
        </span>
      </form>
    );
  }
}
