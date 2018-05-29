/* eslint no-case-declarations: 0 */
/* eslint default-case: 0 */

import { put, select, takeEvery } from 'redux-saga/effects';

import {
  setNavigationState,
  selectDetailsMenuItem,
  selectingDetailsMenuItem
} from 'actions';

import loadData from './api';

export function* selectDetailsMenuAsync(action) {
  const detailsMenuItemId = action.payload;
  const filter = yield select(
    state => state.detailsFilter[detailsMenuItemId]);

  try {
    yield loadData(detailsMenuItemId, filter);

    const topMenuItemId = yield select(state => state.visibilityTopMenu);

    const { baseUrl } = yield select(state => state.urls);
    yield put(setNavigationState({
      top: topMenuItemId,
      second: detailsMenuItemId,
      baseUrl }));
    yield put(selectDetailsMenuItem(detailsMenuItemId));
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(selectingDetailsMenuItem.toString(), selectDetailsMenuAsync);
}
