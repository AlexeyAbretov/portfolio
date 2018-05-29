import { connect } from 'react-redux';
import Notification from '../../../components/settings/notifications';
import {
  updateNotifications,
  confirmNotificationCode,
  sendNotificationConfirmCode,
  confirmNotificationCodeResetAwaiter
} from '../../../actions';
import { NotificationChannelType } from '../../../consts';

const mapStateToProps = state => ({
  notification: (state.notification.notifPoints || [])
    .filter(x => x.channelType === NotificationChannelType.SMS)[0] || {},
  notificationAwaiter: state.notification.notificationAwaiter,
  confirmAwaiter: state.notification.confirmAwaiter,
  confirmCodeAwaiter: state.notification.confirmCodeAwaiter,
  channelType: NotificationChannelType.SMS,
  isPhone: true,
  texts: {
    title: 'С помощью SMS',
    add: 'Добавить номер',
    confirmed: 'Номер подтвержден',
    notConfirmed: 'Номер не подтвержден',
    enter: 'введите номер телефона',
    note: 'Номер также будет использован<br /> для восстановления пароля',
    save: 'Сохранить',
    reject: 'Отменить изменения',
    edit: 'Редактировать',
  },
  confirmTexts: {
    sendAnother: 'Отправить код еще раз',
    done: 'Готово',
    note: 'Введите код подтверждения, который мы отправили Вам на',
    wrongCode: 'Неправильный код',
    enterCode: 'Введите код подтверждения',
    confirmAwaiter: {
      Loading: 'Пожалуйста подождите',
      Success: 'Код отправлен',
      Error: 'При отправке кода произошла ошибка. Попробуйте позднее'
    }
  }
});

const mapDispatchToProps = dispatch => ({
  confirmNotificationCode: (confirmationCode) => {
    dispatch(confirmNotificationCode({ confirmationCode, type: NotificationChannelType.SMS }));
  },
  sendAnotherCode: () => {
    dispatch(sendNotificationConfirmCode(NotificationChannelType.SMS));
  },
  save: (notification) => {
    dispatch(updateNotifications({ notification, sendConfirmationCode: true }));
  },
  edit: (notification) => {
    dispatch(updateNotifications({ notification, sendConfirmationCode: false }));
  },
  resetAwaiters: () => {
    dispatch(confirmNotificationCodeResetAwaiter());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notification);
