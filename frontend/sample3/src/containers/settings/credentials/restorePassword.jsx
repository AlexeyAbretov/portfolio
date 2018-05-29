import { connect } from 'react-redux';
import {
  updateNotifications,
  confirmNotificationCode,
  sendNotificationConfirmCode,
  toggleNotificationHideAwaiter
} from '../../../actions';
import RestorePassword from '../../../components/settings/credentials/restorePassword';

const mapStateToProps = state => ({
  notification: state.notification,
  notificationAwaiter: state.notification.notificationAwaiter,
  confirmAwaiter: state.notification.confirmAwaiter,
  confirmCodeAwaiter: state.notification.confirmCodeAwaiter,
  showAwaiter: state.notification.hideAwaiter.show,
  texts: {
    email: {
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
    phone: {
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
    notificationAwaiter: {
      Loading: 'Пожалуйста подождите',
      Success: 'Настройки уведомлений изменены',
      Error: 'При сохранении настроек произошла ошибка, попробуйте повторить позднее'
    },
    confirmCode: {
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
  }
});

const mapDispatchToProps = dispatch => ({
  confirmNotificationCode: (confirmationCode, type) => {
    dispatch(confirmNotificationCode({ confirmationCode, type }));
  },
  sendAnotherCode: (type) => {
    dispatch(sendNotificationConfirmCode(type));
  },
  save: (notification) => {
    dispatch(updateNotifications({ notification, sendConfirmationCode: true }));
  },
  edit: (notification) => {
    dispatch(updateNotifications({ notification, sendConfirmationCode: false }));
  },
  hideAwaiter: (show) => {
    dispatch(toggleNotificationHideAwaiter(show));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RestorePassword);
