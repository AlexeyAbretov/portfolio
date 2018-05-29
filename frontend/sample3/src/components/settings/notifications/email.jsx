/* eslint react/no-danger:0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import Button from '../../button';

export default class Email extends React.Component {
  constructor(props) {
    super(props);

    this.OnChange = this.OnChange.bind(this);
    this.OnRejectClick = this.OnRejectClick.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);

    this.state = { email: this.props.email, storeEmail: this.props.email };
  }

  componentWillReceiveProps(nextProps) {
    const storeEmail = nextProps.confirmStatus ? nextProps.email : this.state.storeEmail;
    this.setState({ email: nextProps.email, storeEmail });
  }

  OnChange(e) {
    if (e && e.target && e.target.value) {
      this.setState({ email: e.target.value, showTip: false });
    } else {
      this.setState({ email: '', showTip: false });
    }
  }
  OnRejectClick() {
    if (this.props.cancel) {
      this.props.cancel(this.state.storeEmail);
      this.setState({ email: '' });
    }
  }
  OnSaveClick() {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const showTip = !(pattern.test(this.state.email) || this.state.email === '');
    if (this.props.save && !showTip) {
      this.props.save(this.state.email);
      this.setState({ email: '', showTip });
    } else if (showTip) {
      this.setState({ showTip });
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const canSave = this.props.email !== this.state.email;
    const texts = this.props.texts;
    return (
      <div className="edit-center-col wider mtop-top">
        <div className={`input ${this.state.showTip ? 'invalid' : ''}`} data-bind="validationElement: EMailEditValue">
          <input type="text" value={this.state.email} onChange={this.OnChange} />
          <div className="form-tip" style={{ display: this.state.showTip ? 'block' : 'none' }}>{texts.enter}</div>
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
