import { connect } from 'react-redux';
import ContactsWidget from 'components/widgets/contacts';
import {
    NotificationChannelType,
    TOP_MENU_SETTINGS_ITEM_ID,
    SETTINGS_MENU_NOTIFICATIONS_ITEM_ID
} from 'consts';
import Utils from 'utils';
import {
    selectingMenuItem,
    selectingSettingsMenuItem,
    confirmNotificationCode,
    confirmNotificationCodeResetAwaiter,
    sendNotificationConfirmCode,
    sendNotificationConfirmCodeResetAwaiter
} from 'actions';

const mapStateToProps = (state) => {
  const smsPoint = ((state.notification || {}).notifPoints || [])
    .filter(x => x.channelType === NotificationChannelType.SMS)[0];
  const emailPoint = ((state.notification || {}).notifPoints || [])
    .filter(x => x.channelType === NotificationChannelType.EMAIL)[0];
  const phone = smsPoint && smsPoint.enabled ?
    Utils.formatPhone(smsPoint.value) :
    '';
  const email = emailPoint && emailPoint.enabled ?
    emailPoint.value :
    '';

  return {
    title: state.options.contactsTitle,
    phoneText: state.options.phoneText,
    emailText: state.options.emailText,
    changePhoneLinkText: state.options.changePhoneLinkText,
    emailLinkText: email ?
      state.options.сhangeEmailLinkText :
      state.options.addEmailLinkText,
    phone,
    email,
    phoneStatusText: smsPoint && smsPoint.confirmStatus ?
      (state.options.phoneStatusTexts || {}).verified :
      (state.options.phoneStatusTexts || {}).notVerified,
    emailStatusText: emailPoint && emailPoint.confirmStatus ?
      (state.options.emailStatusTexts || {}).verified :
      (state.options.emailStatusTexts || {}).notVerified,
    phoneStatusNote: state.options.phoneStatusNote,
    emailStatusNote: state.options.emailStatusNote,
    phoneConfirmed: smsPoint && smsPoint.confirmStatus,
    emailConfirmed: emailPoint && emailPoint.confirmStatus,
    sendCodeAwaiter: state.notification.confirmAwaiter,
    popup: {
      phoneConfirm: {
        confirmCodeStatus: state.notification.confirmCodeAwaiter.status,
        sendCodeStatus: state.notification.confirmAwaiter.status,
        success: state.options.phoneConfirmResultTexts.success,
        fail: state.options.phoneConfirmResultTexts.fail,
        codeFail: state.options.phoneConfirmResultTexts.codeFail,
        text: state.options.phoneConfirmPopupText,
        sendText: state.options.phoneConfirmPopupSendText,
        confirmText: state.options.phoneConfirmPopupConfirmText,
        descriptionText: state.options.phoneConfirmPopupDescriptionText.replace('{phone}', phone),
      },
      emailConfirm: {
        confirmCodeStatus: state.notification.confirmCodeAwaiter.status,
        sendCodeStatus: state.notification.confirmAwaiter.status,
        success: state.options.emailConfirmResultTexts.success,
        fail: state.options.emailConfirmResultTexts.fail,
        codeFail: state.options.phoneConfirmResultTexts.codeFail,
        text: state.options.emailConfirmPopupText,
        sendText: state.options.emailConfirmPopupSendText,
        confirmText: state.options.emailConfirmPopupConfirmText,
        descriptionText: state.options.emailConfirmPopupDescriptionText.replace('{email}', email),
      }
    }
  };
};

const mapDispatchToProps = dispatch => ({
  changeSettings: () => {
    dispatch(selectingMenuItem(TOP_MENU_SETTINGS_ITEM_ID));
    dispatch(selectingSettingsMenuItem(SETTINGS_MENU_NOTIFICATIONS_ITEM_ID));
  },
  confirmPhoneCode: (confirmationCode) => {
    dispatch(confirmNotificationCode({ confirmationCode, type: NotificationChannelType.SMS }));
  },
  sendPhoneCode: () => {
    dispatch(sendNotificationConfirmCode(NotificationChannelType.SMS));
  },
  confirmEmailCode: (confirmationCode) => {
    dispatch(confirmNotificationCode({ confirmationCode, type: NotificationChannelType.EMAIL }));
  },
  sendEmailCode: () => {
    dispatch(sendNotificationConfirmCode(NotificationChannelType.EMAIL));
  },
  resetAwaiters: () => {
    dispatch(confirmNotificationCodeResetAwaiter());
    dispatch(sendNotificationConfirmCodeResetAwaiter());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactsWidget);
