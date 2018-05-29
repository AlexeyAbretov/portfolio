import { delay } from 'redux-saga';
import { select, takeEvery } from 'redux-saga/effects';

import {
    SWITCH_ACCOUNT
} from 'consts';

import api from '../api';

function* switchAccount(options) {
  try {
    const { baseUrl } = yield select(state => state.urls);
    const data = yield api.switchCtn(options.id);

    if ((data || {}).isSucceeded) {
      yield delay(500);
      location.href = baseUrl;
    }
  } catch (e) {
    console.log(e.message);
  }
}

export default function* () {
  yield takeEvery(SWITCH_ACCOUNT, switchAccount);
}
