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
      .filter(x => x.channelType === NotificationChannelType.EMAIL)[0] || {},
  notificationAwaiter: state.notification.notificationAwaiter,
  confirmAwaiter: state.notification.confirmAwaiter,
  confirmCodeAwaiter: state.notification.confirmCodeAwaiter,
  channelType: NotificationChannelType.EMAIL,
  isEmail: true,
  texts: {
    title: 'По эл. почте',
    add: 'Добавить адрес',
    confirmed: 'Адрес подтвержден',
    notConfirmed: 'Адрес не подтвержден',
    enter: 'введите email',
    note: 'Адрес также будет использован<br /> для доставки уведомлений',
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
    dispatch(confirmNotificationCode({ confirmationCode, type: NotificationChannelType.EMAIL }));
  },
  sendAnotherCode: () => {
    dispatch(sendNotificationConfirmCode(NotificationChannelType.EMAIL));
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
