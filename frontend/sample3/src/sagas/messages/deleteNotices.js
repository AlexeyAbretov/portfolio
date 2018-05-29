import { put, takeEvery } from 'redux-saga/effects';

import {
  DELETE_NOTICES_REQUESTED
} from 'consts';

import {
  deleteNotices
} from 'actions';

import api from '../api';

export function* selectDetailsMenuAsync(action) {
  try {
    const result = yield api.delete(action.noticeIds);

    if (result.isSucceeded) {
      yield put(deleteNotices(action.noticeIds));
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(DELETE_NOTICES_REQUESTED, selectDetailsMenuAsync);
}
