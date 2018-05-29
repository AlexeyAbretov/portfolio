import React from 'react';

import PseudoLink from 'components/link/pseudo';

import Utils from 'utils';
import { OperationStatus } from 'consts';

import Button from '../../button';
import HideAwaiter from '../../awaiters/hide';

export default class ConfirmCode extends React.Component {
  constructor(props) {
    super(props);

    this.OnSendCodeClick = this.OnSendCodeClick.bind(this);
    this.OnSendAnotherCodeClick = this.OnSendAnotherCodeClick.bind(this);
    this.OnChange = this.OnChange.bind(this);

    this.state = { code: '', showAwaiter: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      const errors = [OperationStatus.Fail, OperationStatus.CustomError];
      const showTip = errors.indexOf(nextProps.confirmCodeAwaiter.status) > -1;
      this.setState({ showTip });
    } else {
      this.setState({ showAwaiter: false, code: '' });
    }
    const completeStatuses = [OperationStatus.Success, OperationStatus.Fail, OperationStatus.CustomError];
    if (completeStatuses.indexOf(nextProps.confirmCodeAwaiter.status) > -1) {
      nextProps.resetAwaiters();
    }
  }

  OnSendCodeClick() {
    if (this.props.sendCode && this.state.code) {
      this.props.sendCode(this.state.code);
      this.setState({ showTip: false });
    } else {
      this.setState({ showTip: true });
    }
  }

  OnSendAnotherCodeClick() {
    if (this.props.sendAnotherCode) {
      this.props.sendAnotherCode();
      this.setState({ code: '', showAwaiter: true });
    }
  }

  OnChange(e) {
    if (e && e.target && e.target.value) {
      this.setState({ code: e.target.value, showTip: false });
    } else {
      this.setState({ code: '', showTip: true });
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const texts = this.props.texts;
    const message = Utils.getAwaiterMessage(this.props.confirmAwaiter.status, texts.confirmAwaiter);
    const showTip = this.state.showTip;

    return (
      <div className="folded-blocking folded show" style={{ width: '305px' }} >
        <span className="before" style={{ left: '240px' }} />
        <span className="confirm-block-text italic">
          {texts.note}
          <span className="puts-text">: {this.props.contactTitle}</span>
        </span>
        <div className={`input ${showTip ? 'errorField' : ''}`}>
          <input type="text" value={this.state.code} onChange={this.OnChange} />
          <div className="form-tip" style={{ display: showTip ? '' : 'none' }}>
            {this.state.code ? texts.wrongCode : texts.enterCode}
          </div>
        </div>
        <Button text={texts.done} cssClass="sub label" click={this.OnSendCodeClick} />
        <div className="awaiter-message">
          <HideAwaiter
            message={message}
            status={this.props.confirmAwaiter.status}
            showAwaiter={this.state.showAwaiter}
            hideAwaiter={() => this.setState({ showAwaiter: false })}
            css={{ italic: true, 'message-text': true, 'valign-middle-cell': true }}
          />
        </div>
        <div className="repeat-link">
          <PseudoLink text={texts.sendAnother} css={{ lh100: true }} click={this.OnSendAnotherCodeClick} />
        </div>
      </div>
    );
  }
}
