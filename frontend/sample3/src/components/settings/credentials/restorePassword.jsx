/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import Notification from '../notifications';
import HideAwaiter from '../../awaiters/hide';
import { NotificationChannelType } from '../../../consts';
import Utils from '../../../utils';

export default class RestorePassword extends React.Component {
  constructor(props) {
    super(props);

    this.ConfirmNotificationCodeEmail = this.ConfirmNotificationCodeEmail.bind(this);
    this.ConfirmNotificationCodePhone = this.ConfirmNotificationCodePhone.bind(this);
    this.SendAnotherCodeEmail = this.SendAnotherCodeEmail.bind(this);
    this.SendAnotherCodePhone = this.SendAnotherCodePhone.bind(this);
    this.SelectEmail = this.SelectEmail.bind(this);
    this.SelectPhone = this.SelectPhone.bind(this);

    this.state = {
      isEmail: false,
      isPhone: false
    };
  }

  ConfirmNotificationCodeEmail(confirmationCode) {
    if (this.props.confirmNotificationCode) {
      this.props.confirmNotificationCode(confirmationCode, NotificationChannelType.EMAIL);
    }
  }
  ConfirmNotificationCodePhone(confirmationCode) {
    if (this.props.confirmNotificationCode) {
      this.props.confirmNotificationCode(confirmationCode, NotificationChannelType.SMS);
    }
  }

  SendAnotherCodeEmail() {
    if (this.props.sendAnotherCode) {
      this.props.sendAnotherCode(NotificationChannelType.EMAIL);
    }
  }
  SendAnotherCodePhone() {
    if (this.props.sendAnotherCode) {
      this.props.sendAnotherCode(NotificationChannelType.SMS);
    }
  }

  SelectEmail() {
    this.setState({ isEmail: true, isPhone: false });
  }
  SelectPhone() {
    this.setState({ isEmail: false, isPhone: true });
  }

  render() {
    const texts = this.props.texts;
    const message = Utils.getAwaiterMessage(this.props.notificationAwaiter.status, texts.notificationAwaiter);

    return (
      <div className="user-info">
        <Notification
          notification={this.props.notification.notifPoints
            .filter(x => x.channelType === NotificationChannelType.EMAIL)[0] || {}}
          notificationAwaiter={this.props.notificationAwaiter}
          confirmAwaiter={this.props.confirmAwaiter}
          confirmCodeAwaiter={this.props.confirmCodeAwaiter}
          channelType={NotificationChannelType.EMAIL}
          isEmail
          isRestorePassword
          confirmNotificationCode={this.ConfirmNotificationCodeEmail}
          sendAnotherCode={this.SendAnotherCodeEmail}
          save={this.props.save}
          edit={this.props.edit}
          onRadioChange={this.SelectEmail}
          texts={this.props.texts.email}
          confirmTexts={this.props.texts.confirmCode}
        />
        <Notification
          notification={this.props.notification.notifPoints
            .filter(x => x.channelType === NotificationChannelType.SMS)[0] || {}}
          notificationAwaiter={this.props.notificationAwaiter}
          confirmAwaiter={this.props.confirmAwaiter}
          confirmCodeAwaiter={this.props.confirmCodeAwaiter}
          channelType={NotificationChannelType.SMS}
          isPhone
          isRestorePassword
          confirmNotificationCode={this.ConfirmNotificationCodePhone}
          sendAnotherCode={this.SendAnotherCodePhone}
          save={this.props.save}
          edit={this.props.edit}
          onRadioChange={this.SelectPhone}
          texts={this.props.texts.phone}
          confirmTexts={this.props.texts.confirmCode}
        />
        <HideAwaiter
          message={message}
          status={this.props.notificationAwaiter.status}
          showAwaiter={this.props.showAwaiter}
          hideAwaiter={this.props.hideAwaiter}
        />
      </div>
    );
  }
}
