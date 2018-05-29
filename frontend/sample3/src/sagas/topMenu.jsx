/* eslint no-case-declarations: 0 */
/* eslint default-case: 0 */

import { put, select, takeEvery } from 'redux-saga/effects';

import {
  TOP_MENU_PROFILE_ITEM_ID,
  TOP_MENU_INTERNET_ITEM_ID,
  TOP_MENU_TV_ITEM_ID,

  TOP_MENU_DETAILS_ITEM_ID,
  TOP_MENU_SETTINGS_ITEM_ID,
  TOP_MENU_MESSAGES_ITEM_ID,
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  DateFormats
} from 'consts';

import {
  selectMenuItem,
  setNavigationState,
  getOperationHistory,
  setRequests,
  selectDetailsMenuItem,
  selectedMessageMenuItem,
  selectingSettingsMenuItem,

  selectingMenuItem,
  getNotificationsSettings,
  getPreset
} from 'actions';

import Utils from 'utils';

import api from './api';

export function* loadTopData(topMenuItemId, isLoadSubData = true) {
  switch (topMenuItemId) {
    case TOP_MENU_PROFILE_ITEM_ID:
      const settings = yield api.getNotificationsSettings();
      yield put(getNotificationsSettings(settings));

      const preset = yield api.getPreset();
      yield put(getPreset(preset));

      break;
    case TOP_MENU_INTERNET_ITEM_ID:
    case TOP_MENU_TV_ITEM_ID:
      const data = yield api.getPreset();
      yield put(getPreset(data));
      break;
    case TOP_MENU_DETAILS_ITEM_ID:
      if (isLoadSubData) {
        const filter = yield select(
          state => state.detailsFilter[
            DETAILS_MENU_OPERATION_HISTORY_ITEM_ID]);
        const startDate = Utils.formatDate(
          filter.startDate,
          DateFormats.FullDate);

        const endDate = Utils.formatDate(
          filter.endDate,
          DateFormats.FullDate);

        const operations = yield api.getOperationHistory(
          startDate,
          endDate
        );
        yield put(getOperationHistory(operations || []));
      }

      break;
    case TOP_MENU_MESSAGES_ITEM_ID:
      const requests = yield api.getRequestsData();
      yield put(setRequests(requests));
      break;
  }
}

function* selectMenuAsync(action) {
  try {
    const topMenuItemId = action.payload;

    yield loadTopData(topMenuItemId);

    yield put(selectMenuItem(topMenuItemId));

    const { baseUrl } = yield select(state => state.urls);

    yield put(setNavigationState({
      top: topMenuItemId === TOP_MENU_PROFILE_ITEM_ID ?
        '' :
        topMenuItemId,
      second: null,
      baseUrl
    }));

    switch (topMenuItemId) {
      case TOP_MENU_DETAILS_ITEM_ID:
        yield put(selectDetailsMenuItem(null));
        break;
      case TOP_MENU_SETTINGS_ITEM_ID:
        yield put(selectingSettingsMenuItem(null));
        break;
      case TOP_MENU_MESSAGES_ITEM_ID:
        yield put(selectedMessageMenuItem(null));
        break;
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(selectingMenuItem.toString(), selectMenuAsync);
}
