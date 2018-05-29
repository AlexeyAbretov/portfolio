import { put, takeEvery } from 'redux-saga/effects';

import {
    MARK_NOTICES_AS_READ_REQUESTED
} from 'consts';
import {
  MarkedNoticesAsRead
} from 'actions';

import api from '../api';

export function* selectDetailsMenuAsync(action) {
  try {
    const result = yield api.read(action.noticeIds);
    if (result.isSucceeded) {
      yield put(MarkedNoticesAsRead(action.noticeIds));
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(MARK_NOTICES_AS_READ_REQUESTED, selectDetailsMenuAsync);
}
