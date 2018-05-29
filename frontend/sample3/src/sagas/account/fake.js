/* eslint no-param-reassign:0 */

import { select, put, takeEvery } from 'redux-saga/effects';

import {
    SWITCH_ACCOUNT
} from 'consts';

function* switchAccount(options) {
  try {
    const { id } = options;
    const accounts = yield select(state => state.accounts);

    accounts.forEach((element) => {
      element.isActive = element.account === id;
      if (element.ctns) {
        element.ctns.forEach((x) => { x.isActive = x.account === id; });
      }
    });

    yield put({ type: 'fake', accounts });
  } catch (e) {
    console.log(e.message);
  }
}

export default function* () {
  yield takeEvery(SWITCH_ACCOUNT, switchAccount);
}
