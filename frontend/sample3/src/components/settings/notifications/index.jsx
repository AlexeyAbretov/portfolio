/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import CheckboxWithLabel from '../checkboxWithLabel';
import RadioWithLabel from '../radioWithLabel';
import Email from './email';
import Phone from './phone';
import ConfirmCode from './confirmCode';
import { NotificationChannelType } from '../../../consts';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.OnCheckedChange = this.OnCheckedChange.bind(this);
    this.OnRadioCheckedChange = this.OnRadioCheckedChange.bind(this);
    this.OnAddClick = this.OnAddClick.bind(this);
    this.OnEditClick = this.OnEditClick.bind(this);
    this.OnCancelClick = this.OnCancelClick.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);
    this.OnSendCodeClick = this.OnSendCodeClick.bind(this);
    this.OnSendAnotherCodeClick = this.OnSendAnotherCodeClick.bind(this);

    this.state = {
      showEdit: false,
      showConfirm: false,
      showAwaiter: false,
      notification: { ...props.notification }
    };
  }

  componentWillReceiveProps(nextProps) {
    const hasValue = nextProps.notification.value != null;
    const isCurrentChannelType =
      (nextProps.notificationAwaiter.channelType === NotificationChannelType.EMAIL && nextProps.isEmail) ||
      (nextProps.notificationAwaiter.channelType === NotificationChannelType.SMS && nextProps.isPhone);
    this.setState({
      showConfirm: hasValue ? !nextProps.notification.confirmStatus && isCurrentChannelType : false,
      notification: { ...nextProps.notification }
    });
  }

  OnCheckedChange() {
    if (this.props.save) {
      const notification = { ...this.state.notification };
      notification.enabled = !this.state.notification.enabled;
      this.props.edit(notification);
      this.setState({ notification, showAwaiter: true });
    }
  }
  OnRadioCheckedChange() {
    if (this.props.save && this.props.onRadioChange) {
      const notification = { ...this.state.notification };
      notification.passRecovery = !this.state.notification.passRecovery;
      // this.props.onRadioChange();
      this.props.edit(notification);
      this.setState({ notification, showAwaiter: true });
    }
  }
  OnAddClick() {
    this.setState({ showEdit: true, showConfirm: false });
  }
  OnEditClick() {
    this.setState({ showEdit: true, showConfirm: false });
  }
  OnCancelClick(contact) {
    const notification = { ...this.state.notification };
    notification.value = contact;
    this.setState({ showEdit: false, showConfirm: false, notification });
  }
  OnSaveClick(value) {
    if (this.props.save) {
      const notification = {
        value,
        channelType: this.props.channelType,
        confirmStatus: this.state.notification.confirmStatus ? this.state.notification.confirmStatus : false,
        enabled: this.state.notification.enabled ? this.state.notification.enabled : false,
        passRecovery: this.state.notification.passRecovery ? this.state.notification.passRecovery : null
      };
      this.props.save(notification);
      this.setState({ notification, showEdit: false, showConfirm: true });
    }
  }
  OnSendCodeClick(code) {
    if (this.props.confirmNotificationCode) {
      this.props.confirmNotificationCode(code);
    }
  }
  OnSendAnotherCodeClick() {
    if (this.props.sendAnotherCode) {
      this.props.sendAnotherCode();
    }
  }

  render() {
    const hasContact = !!this.state.notification.value;

    const showAddText = !this.state.showEdit && !hasContact;
    const showEditText = !this.state.showEdit && hasContact;

    const display = x => ({ display: x ? '' : 'none' });

    const contact = hasContact ? this.state.notification.value : '';
    const contactTitle = this.props.isPhone && contact
      ? contact.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 $1 $2-$3-$4')
      : contact;

    const radioOrCheckbox = this.props.isRestorePassword
      ? (
        <RadioWithLabel
          text={this.props.texts.title}
          cssClass="edit-left-col"
          checked={this.state.notification.passRecovery === true}
          onChange={this.OnRadioCheckedChange}
        />
      )
      : (
        <CheckboxWithLabel
          text={this.props.texts.title}
          onChange={this.OnCheckedChange}
          checked={this.state.notification.enabled && hasContact}
          disabled={!hasContact}
        />
      );

    return (
      <div className="edit-channel">
        {radioOrCheckbox}
        <Email
          show={this.props.isEmail && this.state.showEdit}
          email={contact}
          cancel={this.OnCancelClick}
          save={this.OnSaveClick}
          confirmStatus={this.props.notification.confirmStatus}
          texts={this.props.texts}
        />
        <Phone
          show={this.props.isPhone && this.state.showEdit}
          phone={contact}
          cancel={this.OnCancelClick}
          save={this.OnSaveClick}
          confirmStatus={this.props.notification.confirmStatus}
          texts={this.props.texts}
        />
        <div className="edit-center-col">
          <span className="global" onClick={this.OnAddClick} style={display(showAddText)}>{this.props.texts.add}</span>
          <span className="e-mail" style={display(showEditText)}>{contactTitle}</span>
          <ConfirmCode
            show={this.state.showConfirm}
            sendCode={this.OnSendCodeClick}
            sendAnotherCode={this.OnSendAnotherCodeClick}
            confirmAwaiter={this.props.confirmAwaiter}
            confirmCodeAwaiter={this.props.confirmCodeAwaiter}
            resetAwaiters={this.props.resetAwaiters}
            contactTitle={contactTitle}
            texts={this.props.confirmTexts}
          />
        </div>
        <div className="edit-right-col">
          <span className="edit-dyn" style={display(showEditText)}>
            <PseudoLink text={this.props.texts.edit} click={this.OnEditClick} />
          </span>
        </div>
      </div>
    );
  }
}
