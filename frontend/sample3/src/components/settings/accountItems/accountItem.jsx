/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import moment from 'moment';

import PseudoLink from 'components/link/pseudo';
import Link from 'components/link';
import Button from 'components/button';

import Utils from 'utils';

import BlockAwaiter from '../../awaiters/block';

export default class AccountItem extends React.Component {

  constructor(props) {
    super(props);

    this.OnToggleEditClick = this.OnToggleEditClick.bind(this);
    this.OnToggleBlockNumberClick = this.OnToggleBlockNumberClick.bind(this);
    this.OnManageAccountClick = this.OnManageAccountClick.bind(this);
    this.OnChangePasswordClick = this.OnChangePasswordClick.bind(this);
    this.OnBlockNumberClick = this.OnBlockNumberClick.bind(this);
    this.OnRejectClick = this.OnRejectClick.bind(this);
    this.OnChangeActiveAccountClick = this.OnChangeActiveAccountClick.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);

    this.state = { toogleBlockNumber: false, ssoLoginDefault: props.ssoLoginDefault };
  }

  OnToggleEditClick() {
    if (this.props.toggleEditAccountClick) {
      this.props.toggleEditAccountClick({ ctn: this.props.ctn, toggle: !this.props.toggleEditAccount });
    }
    this.setState({ ssoLoginDefault: this.props.ssoLoginDefault });
  }

  OnToggleBlockNumberClick() {
    const toogleBlockNumber = !this.state.toogleBlockNumber;
    this.setState({ toogleBlockNumber });
  }

  OnManageAccountClick() {
    if (this.props.manageAccountClick) {
      this.props.manageAccountClick();
    }
  }

  OnChangePasswordClick() {
    if (this.props.changePasswordClick) {
      this.props.changePasswordClick();
    }
  }

  OnBlockNumberClick() {
    if (this.props.blockNumberClick) {
      let dateFrom;
      if (this.props.sharedData.currentClientServerTimeStamp) {
        dateFrom = moment(this.props.sharedData.currentClientServerTimeStamp).toDate();
      } else {
        dateFrom = moment(new Date()).toDate();
      }
      const dateTo = moment(dateFrom).add(this.props.block.blockInfo.maxBlockDays, 'days').toDate();

      const data = {
        from: moment(dateFrom).add('hours', -this.props.sharedData.timeShift).toISOString(),
        to: moment(dateTo).add('hours', -this.props.sharedData.timeShift).toISOString(),
        login: this.props.name,
        ctn: this.props.ctn,
        isMobile: this.props.isMobile
      };

      this.props.blockNumberClick(data);
    }
  }

  OnRejectClick() {
    const { text, ok, cancel } = { ...this.props.texts.confirmPopup };
    Utils.confirmPopup(text.replace('{ctn}', Utils.getLoginTitleString(this.props.ctn)), ok, cancel,
      () => {
        if (this.props.deleteAccountClick) {
          this.props.deleteAccountClick(this.props.name);
        }
      });
  }

  OnChangeActiveAccountClick() {
    if (this.props.changeActiveAccountClick) {
      this.props.changeActiveAccountClick(this.props.ctn, !this.state.ssoLoginDefault);
      this.setState({ ssoLoginDefault: !this.state.ssoLoginDefault });
    }
  }

  OnSaveClick() {
    if (this.state.ssoLoginDefault !== this.props.ssoLoginDefault && this.props.saveChangeActiveAccountClick) {
      this.props.saveChangeActiveAccountClick();
    }
  }

  render() {
    const texts = this.props.texts;
    let cssPhoneLine = 'phone-line';
    if (this.props.ssoLoginDefault) {
      cssPhoneLine += ' active-account';
    } else if (this.props.toggleEditAccount) {
      cssPhoneLine += ' visible';
    }
    const cssListPhones = this.props.ssoLoginDefault ? '' : 'list-phones';
    const canSave = this.state.ssoLoginDefault !== this.props.ssoLoginDefault;
    const ctn = Utils.getLoginTitleString(this.props.ctn);

    const message = Utils.getAwaiterMessage(this.props.awaiter.status, texts.awaiter);
    const note = texts.note.replace('{maxBlockDays}', this.props.block.blockInfo.maxBlockDays);

    const blockButton = (() => {
      switch (this.props.block.status) {
        case 0:
          return (<PseudoLink text={texts.block} click={this.OnToggleBlockNumberClick} />);
        case -1:
          return (<span className="yellow-rounded-block italic" style={{ marginLeft: '0' }}>{texts.waitBlock}</span>);
        default:
          return (<span className="red-rounded-block italic" style={{ marginLeft: '0' }}>{texts.blocked}</span>);
      }
    })();

    return (
      <div className={cssListPhones}>
        <div className={cssPhoneLine}>
          <div className="control-phone-number">
            <span className="edit-dyn">
              <PseudoLink text={texts.edit} click={this.OnToggleEditClick} />
            </span>
            <span className="reject-round" style={{ display: this.props.ssoLoginDefault ? 'none' : '' }}>
              <PseudoLink text={texts.reject} click={this.OnRejectClick} />
            </span>
          </div>
          <div className={this.props.type.toUpperCase() === 'CONVERGENT' ? 'convergent-number' : 'home-number'}>
            <b>{ctn}</b>
            <span>{this.props.nickname}</span>
          </div>
        </div>
        <div
          className="folded"
          style={{ margin: '10px 20px', display: this.props.toggleEditAccount ? 'block' : 'none' }}
        >
          <span className="before" style={{ left: '610px' }} />
          <span className="close-icon" />
          <div className="buttons">
            <div className="foldable">
              <span className="btn-control">
                <Link text={texts.manage} isVisible click={this.OnManageAccountClick} />
              </span>
              <span className="btn-blocked">
                <div className="account-status">
                  {blockButton}
                </div>
              </span>
              <span className="btn-change-pass" style={{ display: this.props.ssoLoginDefault ? '' : 'none' }}>
                <Link text={texts.changePassword} isVisible click={this.OnChangePasswordClick} />
              </span>
            </div>
            <div className="content-main-block">
              <div
                className="folded bg-white"
                style={{ width: '500px', display: this.state.toogleBlockNumber ? 'block' : 'none' }}
              >
                <span className="before" style={{ left: '250px' }} />
                <span dangerouslySetInnerHTML={{ __html: note }} />
                <BlockAwaiter
                  message={message}
                  status={this.props.awaiter.status}
                  requestId={this.props.requestId}
                  navigate={this.props.messageClick}
                />
                <div className="mtop10">
                  <Button
                    text={texts.block}
                    cssClass="sub label"
                    click={this.OnBlockNumberClick}
                    style={{ marginRight: '10px' }}
                  />
                  <PseudoLink text={texts.noBlock} click={this.OnToggleBlockNumberClick} />
                </div>
              </div>
            </div>
            <div style={{ display: this.props.accountsLength > 1 ? '' : 'none' }}>
              <span
                className={`checkbox-slide ${this.state.ssoLoginDefault ? 'checked' : ''}`}
                onClick={this.OnChangeActiveAccountClick}
              />
              <label htmlFor="#">{texts.showFirst}</label>
            </div>
          </div>
          <div className="submit-or-cancel manag" style={{ display: this.props.accountsLength > 1 ? '' : 'none' }}>
            <div style={{ marginBottom: '10px' }} />
            <div>
              <Button text={texts.save} cssClass="sub label" isDisabled={!canSave} click={this.OnSaveClick} />
              <span className="or">или</span>
              <PseudoLink text={texts.rejectChanges} click={this.OnToggleEditClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
