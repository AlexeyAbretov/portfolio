import { delay } from 'redux-saga';
import { put, select, takeEvery } from 'redux-saga/effects';
import {
  UPDATE_NOTIFICATIONS,
  CONFIRM_NOTIFICATION_CODE,
  SEND_NOTIFICATION_CONFIRM_CODE,
  OperationStatus
} from '../../consts';
import {
    updateNotificationsAwaiter,
    confirmNotificationCodeAwaiter,
    sendNotificationConfirmCodeAwaiter
  } from '../../actions';
import api from '../api';

function* updateNotificationsAsync(action) {
  yield put(updateNotificationsAwaiter({ status: OperationStatus.Pending }));

  try {
    const notification = yield select(state => state.notification);
    const isPassRecoveryChange = action.data.notification.passRecovery === true;
    notification.notifPoints = notification.notifPoints.map((x) => {
      if (x.channelType === action.data.notification.channelType) {
        return action.data.notification;
      }
      if (isPassRecoveryChange) {
        const item = { ...x };
        item.passRecovery = null;
        return item;
      }
      return x;
    });
    const model = {
      notifPoints: new Array(action.data.notification),
      actionNotifications: null
    };
    const result = yield api.put(model);

    if (result && result.isSucceeded === true) {
      if (action.data.sendConfirmationCode === true && action.data.notification.value) {
        const sendConfirmCodeResult = yield api.sendCode(action.data.notification.channelType);
        if (sendConfirmCodeResult.isSucceeded === true) {
          notification.notifPoints = notification.notifPoints.map((x) => {
            if (action.data.notification.channelType === x.channelType) {
              const point = { ...x };
              point.confirmStatus = false;
              return point;
            }
            return x;
          });
        }
      }
      yield put(updateNotificationsAwaiter({
        status: OperationStatus.Success,
        result: notification,
        channelType: action.data.notification.channelType
      }));
    } else {
      yield put(updateNotificationsAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(updateNotificationsAwaiter({ status: OperationStatus.Fail }));
  }
}

function* confirmNotificationCodeAsync(action) {
  try {
    yield put(confirmNotificationCodeAwaiter({ status: OperationStatus.Pending }));
    const result = yield api.confirmCode(action.data);
    yield delay(500);
    if (!result) {
      yield put(confirmNotificationCodeAwaiter({ status: OperationStatus.Fail }));
      return;
    }
    if (result.isSucceeded === true) {
      let notification = yield select(state => state.notification);
      notification = { ...notification };
      notification.notifPoints = notification.notifPoints.map((x) => {
        if (action.data.type === x.channelType) {
          const point = { ...x };
          point.confirmStatus = result.confirmStatus;
          return point;
        }
        return x;
      });
      yield put(confirmNotificationCodeAwaiter({ status: OperationStatus.Success, result: notification }));
    } else if (result.meta && (result.meta.code === 20019 || result.meta.code === 20021)) {
      yield put(confirmNotificationCodeAwaiter({ status: OperationStatus.CustomError }));
    } else {
      yield put(confirmNotificationCodeAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(confirmNotificationCodeAwaiter({ status: OperationStatus.Fail }));
  }
}

function* sendNotificationConfirmCodeAsync(action) {
  yield put(sendNotificationConfirmCodeAwaiter({ status: OperationStatus.Pending }));

  try {
    const sendConfirmCodeResult = yield api.sendCode(action.data);
    if (sendConfirmCodeResult.isSucceeded === true) {
      let notification = yield select(state => state.notification);
      notification = { ...notification };
      notification.notifPoints = notification.notifPoints.map((x) => {
        if (action.data === x.channelType) {
          const point = { ...x };
          point.confirmStatus = false;
          return point;
        }
        return x;
      });
      yield put(sendNotificationConfirmCodeAwaiter({
        status: OperationStatus.Success,
        result: notification,
        channelType: action.data
      }));
    } else {
      yield put(sendNotificationConfirmCodeAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(sendNotificationConfirmCodeAwaiter({ status: OperationStatus.Fail }));
  }
}

export default function* () {
  yield takeEvery(UPDATE_NOTIFICATIONS, updateNotificationsAsync);
  yield takeEvery(CONFIRM_NOTIFICATION_CODE, confirmNotificationCodeAsync);
  yield takeEvery(SEND_NOTIFICATION_CONFIRM_CODE, sendNotificationConfirmCodeAsync);
}
