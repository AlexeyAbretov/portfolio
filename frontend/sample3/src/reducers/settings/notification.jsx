import {
  getNotificationsSettings
} from 'actions';

import {
  UPDATE_NOTIFICATIONS_AWAITER,
  CONFIRM_NOTIFICATION_CODE_AWAITER,
  CONFIRM_NOTIFICATION_CODE_RESET_AWAITER,
  SEND_NOTIFICATION_CONFIRM_CODE_AWAITER,
  SEND_NOTIFICATION_CONFIRM_CODE_RESET_AWAITER,
  NOTIFICATIONS_HIDEAWAITER_TOGGLE
} from 'consts';

const notification = (state = {
  notificationAwaiter: {},
  confirmAwaiter: {},
  confirmCodeAwaiter: {},
  hideAwaiter: { show: false }
}, action) => {
  const newState = {
    ...state
  };

  switch (action.type) {
    case getNotificationsSettings.toString():
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_NOTIFICATIONS_AWAITER:
      if (action.data.result) {
        newState.notifPoints = action.data.result.notifPoints;
      }
      newState.notificationAwaiter = action.data;
      newState.hideAwaiter = { show: true };
      return newState;
    case CONFIRM_NOTIFICATION_CODE_AWAITER:
      if (action.data.result) {
        newState.notifPoints = action.data.result.notifPoints;
      }
      newState.confirmCodeAwaiter = action.data;
      return newState;
    case CONFIRM_NOTIFICATION_CODE_RESET_AWAITER:
      newState.confirmCodeAwaiter = { status: null };
      return newState;
    case SEND_NOTIFICATION_CONFIRM_CODE_AWAITER:
      if (action.data.result) {
        newState.notifPoints = action.data.result.notifPoints;
      }
      newState.confirmAwaiter = action.data;
      return newState;
    case SEND_NOTIFICATION_CONFIRM_CODE_RESET_AWAITER:
      newState.confirmAwaiter = { status: null };
      return newState;
    case NOTIFICATIONS_HIDEAWAITER_TOGGLE:
      newState.hideAwaiter = { show: action.data };
      return newState;
    default:
  }

  return state;
};

export default notification;
