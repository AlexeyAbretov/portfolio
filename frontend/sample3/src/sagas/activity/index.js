import { put, takeLatest, select } from 'redux-saga/effects';

import
  actions
from 'symbiotes/activity';

import {
  getToggleChangeBlockActivity
} from 'selectors/activity';

export function* start(action = {}) {
  yield put(actions.activity.pending());

  try {
    const [name] = action.payload || [];
    const activity = yield select(state => getToggleChangeBlockActivity(state));
    yield put(actions.activity.success(
      name,
      !activity.status));
  } catch (e) {
    yield put(actions.activity.fail());
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.activity.start.toString(), start);
}
