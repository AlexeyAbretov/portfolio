/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';
import classNames from 'classnames/bind';
import { WhiteBlock } from 'components/vendor-ui';
import Tooltip, { TooltipPosition } from 'components/tooltip/vendor';
import WidgetLink from 'components/widgetLink';
import { NotificationChannelType } from 'consts';
import style from './style.css';
import commonStyles from '../common-styles.css';
import ConfirmPopup from './popups/confirm';

const cx = classNames.bind(style);

export default class ContactsWidget extends React.Component {
  constructor(props) {
    super(props);

    this.closePopup = this.closePopup.bind(this);
    this.changeSettings = this.changeSettings.bind(this);

    this.state = { showConfirmPhonePopup: false, showConfirmEmailPopup: false };
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.sendCodeAwaiter.channelType) {
      case NotificationChannelType.SMS:
        this.setState({ showConfirmPhonePopup: true });
        break;
      case NotificationChannelType.EMAIL:
        this.setState({ showConfirmEmailPopup: true });
        break;
      default:
    }
  }

  closePopup() {
    this.setState({ showConfirmPhonePopup: false, showConfirmEmailPopup: false });
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
  }
  changeSettings() {
    this.props.changeSettings();
  }

  render() {
    const {
      title,
      phone,
      email,
      phoneText,
      emailText,
      phoneConfirmed,
      emailConfirmed,
      phoneStatusText,
      emailStatusText,
      phoneStatusNote,
      emailStatusNote,
      changeSettings,
      emailLinkText,
      changePhoneLinkText,
      confirmPhoneCode,
      sendPhoneCode,
      confirmEmailCode,
      sendEmailCode
    } = this.props;

    const phoneStatus = phoneConfirmed
      ? (
        <span className={cx(commonStyles['lk-tiles__status-confirmed'])}>
          {phoneStatusText}
          <img
            src="http://static.vendordev.ru/upload/images/home/profile/status-ok.png"
            alt="confirm"
            className={cx(commonStyles['lk-tiles__status-confirmed-icon'])}
          />
        </span>
        )
      : (
        <span className={cx('contacts-widget__pseudolink')} onClick={() => sendPhoneCode()}>
          {phoneStatusText}
        </span>);
    const emailStatus = emailConfirmed
      ? (
        <span className={cx(commonStyles['lk-tiles__status-confirmed'])}>
          {emailStatusText}
          <img
            src="http://static.vendordev.ru/upload/images/home/profile/status-ok.png"
            alt="confirm"
            className={cx(commonStyles['lk-tiles__status-confirmed-icon'])}
          />
        </span>
        )
      : (
        <span className={cx('contacts-widget__pseudolink')} onClick={() => sendEmailCode()}>
          {emailStatusText}
        </span>);

    const confirmPhonePopup = (
      <ConfirmPopup
        {...this.props.popup.phoneConfirm}
        confirm={confirmPhoneCode}
        sendCode={sendPhoneCode}
        closePopup={this.closePopup}
        isShow={this.state.showConfirmPhonePopup}
      />
    );
    const confirmEmailPopup = (
      <ConfirmPopup
        {...this.props.popup.emailConfirm}
        confirm={confirmEmailCode}
        sendCode={sendEmailCode}
        closePopup={this.closePopup}
        isShow={this.state.showConfirmEmailPopup}
      />
    );

    const emptyNotification = `Добавьте номер телефона или
      электронную почту, чтобы
      получать уведомления об оплате,
      предупреждениях и прочем`;
    const emptyLinkText = ['Добавить', <br key="br" />, 'контактные', <span key="nbsp">&nbsp;</span>, 'данные'];

    return (
      <WhiteBlock className={cx(commonStyles['contacts-widget'])}>
        {confirmPhonePopup}
        {confirmEmailPopup}
        { phone || email ?
          (<div>
            <h3 className={cx('contacts-widget__header')}>{title}</h3>
            <table className={cx('contacts-widget__table')}>
              <tbody>
                {phone ?
                (<tr>
                  <td>{phoneText}</td>
                  <td>{phone}</td>
                </tr>) : null}
                {phone ?
                (<tr>
                  <td />
                  <td>
                    {phoneStatus}
                    { !phoneConfirmed &&
                      <Tooltip position={TooltipPosition.right} width={210}>
                        <div>{phoneStatusNote}</div>
                      </Tooltip>}
                  </td>
                </tr>) : null}
                {email ?
                (<tr>
                  <td>{emailText}</td>
                  <td>{email}</td>
                </tr>) : null}
                {email ?
                (<tr>
                  <td />
                  <td>
                    {emailStatus}
                    { !emailConfirmed &&
                      <Tooltip position={TooltipPosition.right} width={210}>
                        <div>{emailStatusNote}</div>
                      </Tooltip>}
                  </td>
                </tr>) : null}
              </tbody>
            </table>
            <WidgetLink text={changePhoneLinkText} onClick={changeSettings} />
            <WidgetLink text={emailLinkText} onClick={changeSettings} />
          </div>) :
          (<div className={cx('contacts-widget__empty-block')}>
            <img src="http://static.vendordev.ru/upload/images/home/profile/empty-contacts.png" alt="icon" />
            <p className={cx('contacts-widget__empty-block-note')}>
              {emptyNotification}
            </p>
            <div className={cx('contacts-widget__empty-block-link-wrap')}>
              <span
                role="button"
                tabIndex={0}
                className={cx('contacts-widget__empty-block-link')}
                onClick={this.changeSettings}
              >
                {emptyLinkText}
              </span>
            </div>
          </div>)
        }
      </WhiteBlock>);
  }
}
