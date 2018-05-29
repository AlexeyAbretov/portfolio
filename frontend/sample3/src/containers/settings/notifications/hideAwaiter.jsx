import { connect } from 'react-redux';
import HideAwaiter from '../../../components/awaiters/hide';
import { toggleNotificationHideAwaiter } from '../../../actions';
import Utils from '../../../utils';

const mapStateToProps = state => ({
  message: Utils.getAwaiterMessage(state.notification.notificationAwaiter.status, {
    Loading: 'Пожалуйста подождите',
    Success: 'Настройки уведомлений изменены',
    Error: 'При сохранении настроек произошла ошибка, попробуйте повторить позднее'
  }),
  status: state.notification.notificationAwaiter.status,
  showAwaiter: state.notification.hideAwaiter.show
});

const mapDispatchToProps = dispatch => ({
  hideAwaiter: (show) => {
    dispatch(toggleNotificationHideAwaiter(show));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HideAwaiter);
