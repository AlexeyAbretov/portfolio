import { put, select, takeEvery } from 'redux-saga/effects';

import {
  MESSAGES_MENU_ITEM_SELECTING,
  MESSAGES_MENU_REQUESTS_ID
} from 'consts';
import {
  setNotices,
  setRequests,
  setNavigationState,
  selectedMessageMenuItem
} from 'actions';

import api from '../api';

export function* selectDetailsMenuAsync(action) {
  const messagesMenuItemId = action.id;
  const params = action.params;
  try {
    const topMenuItemId = yield select(state => state.visibilityTopMenu);

    if (!messagesMenuItemId || messagesMenuItemId === MESSAGES_MENU_REQUESTS_ID) {
      const data = yield api.getRequestsData();
      yield put(setRequests(data));
    } else {
      const isArchive = params
        ? action.params.some(item => item.name.toLowerCase() === 'arch')
        : false;

      const data = yield api.getNoticesData(isArchive);
      data.isArchive = isArchive;
      yield put(setNotices(data));
    }

    const { baseUrl } = yield select(state => state.urls);
    yield put(setNavigationState({
      top: topMenuItemId,
      second: messagesMenuItemId,
      baseUrl,
      params }));
    yield put(selectedMessageMenuItem(messagesMenuItemId));
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(MESSAGES_MENU_ITEM_SELECTING, selectDetailsMenuAsync);
}
