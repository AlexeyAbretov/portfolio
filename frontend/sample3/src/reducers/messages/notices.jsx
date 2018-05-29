/* eslint eqeqeq: 0 */
import {
  SET_NOTICES,
  DELETE_NOTICES,
  MARKED_NOTICES_AS_READ,

  UserNotificationStatus
} from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case SET_NOTICES:
      return action.notices;
    case DELETE_NOTICES:
      if (!action.noticeIds || !action.noticeIds.length) {
        return state;
      }
      return state
        .filter(x => !action.noticeIds.filter(z => z == x.notificationId).length);
    case MARKED_NOTICES_AS_READ:
      if (!action.noticeIds || !action.noticeIds.length) {
        return state;
      }
      return state.map(x => ({
        ...x,
        status: action.noticeIds.filter(z => z == x.notificationId).length ?
          UserNotificationStatus.Read :
          x.status
      }));
    default:
  }

  return state;
};
