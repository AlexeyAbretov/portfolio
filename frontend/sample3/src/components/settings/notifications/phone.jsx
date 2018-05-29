/* eslint react/no-danger:0 */

import React from 'react';
import MaskedInput from 'react-text-mask';

import PseudoLink from 'components/link/pseudo';

import Utils from 'utils';

import Button from '../../button';

export default class Phone extends React.Component {
  constructor(props) {
    super(props);

    this.OnCodeChange = this.OnCodeChange.bind(this);
    this.OnPhoneChange = this.OnPhoneChange.bind(this);
    this.OnRejectClick = this.OnRejectClick.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);

    const phone = Utils.parsePhone(props.phone);
    phone.phone = this.props.phone;
    phone.showTip = false;
    phone.storePhone = this.props.phone;
    this.state = phone;
  }

  componentWillReceiveProps(nextProps) {
    const phone = Utils.parsePhone(nextProps.phone);
    phone.phone = nextProps.phone;
    phone.storePhone = nextProps.confirmStatus ? nextProps.email : this.state.storePhone;
    this.setState(phone);
  }

  getPhone() {
    return { phoneCode: this.state.phoneCode, phoneNumber: this.state.phoneNumber };
  }

  OnCodeChange(e) {
    if (e && e.target && e.target.value) {
      this.setState({ phoneCode: e.target.value, showTip: false });
    } else {
      this.setState({ phoneCode: '' });
    }
  }
  OnPhoneChange(e) {
    if (e && e.target && e.target.value) {
      this.setState({ phoneNumber: e.target.value, showTip: false });
    } else {
      this.setState({ phoneNumber: '' });
    }
  }
  OnRejectClick() {
    if (this.props.cancel) {
      this.props.cancel(this.state.storePhone);
      this.setState({ phoneCode: '', phoneNumber: '' });
    }
  }
  OnSaveClick() {
    let phone = Utils.combinePhone(this.getPhone());
    phone = phone.replace(/-/g, '');
    const showTip = phone.replace(/[0-9]/g, '').length > 0;
    if (this.props.save && !showTip) {
      this.props.save(phone);
      this.setState({ phoneCode: '', phoneNumber: '' });
    } else if (showTip) {
      this.setState({ showTip });
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const phone = Utils.parsePhone(this.props.phone);
    const canSave = phone.phoneCode !== this.state.phoneCode || phone.phoneNumber !== this.state.phoneNumber;
    const texts = this.props.texts;
    return (
      <div className="edit-center-col wider mtop-top">
        <div className="dev-code inline-block valign-top" style={{ minWidth: '183px' }}>
          <span className="code">+7</span>
          <div className={`input phone-code ${this.state.showTip ? 'invalid' : ''}`} style={{ width: '42px' }}>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/]}
              guide
              className="masked"
              value={this.state.phoneCode}
              onChange={this.OnCodeChange}
            />
          </div>
          <div className={`input phone-input ${this.state.showTip ? 'invalid' : ''}`} style={{ width: '90px' }}>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
              guide
              className="masked"
              value={this.state.phoneNumber}
              onChange={this.OnPhoneChange}
            />
          </div>
          <div className="form-tip" style={{ display: this.state.showTip ? '' : 'none' }}>{texts.enter}</div>
        </div>
        <span className="descr italic" dangerouslySetInnerHTML={{ __html: texts.note }} />
        <div className="submit-or-cancel">
          <Button text={texts.save} cssClass="sub label" isDisabled={!canSave} click={this.OnSaveClick} />
          <span className="or">или</span>
          <PseudoLink text={texts.reject} css={{ lh100: true }} click={this.OnRejectClick} />
        </div>
      </div>
    );
  }
}
