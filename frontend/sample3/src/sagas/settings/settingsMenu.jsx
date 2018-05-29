/* eslint no-case-declarations: 0 */
/* eslint default-case: 0 */

import { put, select, takeEvery, all } from 'redux-saga/effects';

import {
  SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID,
  SETTINGS_MENU_NOTIFICATIONS_ITEM_ID,
  SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID
} from 'consts';
import {
  getManageNumbers,
  getNotificationsSettings,
  getManageCredentials,
  getSharedData,
  setNavigationState,
  getSocialAccounts,
  getManageIpTv,
  selectSettingsMenuItem,
  selectingSettingsMenuItem
} from 'actions';

import api from '../api';

function setAwaiters(items) {
  return (items || []).map((x) => {
    const item = { ...x };
    item.awaiter = {};
    return item;
  });
}

function* selectSettingsMenuAsync(action) {
  const { baseUrl } = yield select(state => state.urls);

  const settingsMenuItemId = action.payload;

  try {
    switch (settingsMenuItemId) {
      case SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID:
      default:
        const settings = yield all({
          manageAccounts: api.getManagedAccounts(),
          profileAccess: api.getProfileAccess(),
          recommendations: api.getRecommendations(),
          outgoingRequests: api.getOutgoingRequests(),
          incomingInvites: api.getIncomingInvites()
        });
        settings.manageAccounts = setAwaiters(settings.manageAccounts);
        settings.incomingInvites = setAwaiters(settings.incomingInvites);
        settings.outgoingRequests = setAwaiters(settings.outgoingRequests);
        settings.profileAccess.accounts = setAwaiters(settings.profileAccess.accounts);
        settings.profileAccess.incomingRequests = setAwaiters(settings.profileAccess.incomingRequests);
        settings.profileAccess.outgoingInvites = setAwaiters(settings.profileAccess.outgoingInvites);
        yield put(getManageNumbers(settings));
        const sharedData = yield api.getSharedData();
        yield put(getSharedData(sharedData));
        const socialAccounts = yield api.getSocialAccount();
        yield put(getSocialAccounts({ vk: socialAccounts.vkAccount, fb: socialAccounts.fbAccount }));
        break;
      case SETTINGS_MENU_NOTIFICATIONS_ITEM_ID:
        const notification = yield all({
          notificationProfile: api.getNotificationsSettings(),
          manageIpTv: api.getManageIpTv(),
          sharedData: api.getSharedData(),
          socialAccounts: api.getSocialAccount()
        });
        yield put(getNotificationsSettings(notification.notificationProfile));
        yield put(getManageIpTv(notification.manageIpTv));
        yield put(getSharedData(notification.sharedData));
        yield put(getSocialAccounts({
          vk: notification.socialAccounts.vkAccount,
          fb: notification.socialAccounts.fbAccount
        }));
        break;
      case SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID:
        const credentials = yield all({
          manageAccounts: api.getManagedAccounts(),
          notificationProfile: api.getNotificationsSettings(),
          sharedData: api.getSharedData(),
          socialAccounts: api.getSocialAccount()
        });
        yield put(getManageCredentials({
          loginData: credentials.manageAccounts.filter(x => x.ssoLoginDefault === true)[0] || {},
          changePasswordList: credentials.manageAccounts.filter(x => x.ssoLoginDefault !== true) || []
        }));
        yield put(getNotificationsSettings(credentials.notificationProfile));
        yield put(getSharedData(credentials.sharedData));
        yield put(getSocialAccounts({
          vk: credentials.socialAccounts.vkAccount,
          fb: credentials.socialAccounts.fbAccount
        }));
        break;
    }

    const topMenuItemId = yield select(state => state.visibilityTopMenu);

    yield put(setNavigationState({ top: topMenuItemId, second: settingsMenuItemId, baseUrl }));
    yield put(selectSettingsMenuItem(settingsMenuItemId));
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(selectingSettingsMenuItem.toString(), selectSettingsMenuAsync);
}
