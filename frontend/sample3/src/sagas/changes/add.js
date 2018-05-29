import { put, takeEvery } from 'redux-saga/effects';

import
  actions
from 'symbiotes/changes';

export function* addService(action = {}) {
  yield put(actions.services.add.pending());

  try {
    const [key, service] = action.payload || [];
    yield put(actions.services.add.success(
      key,
      service));
  } catch (e) {
    yield put(actions.services.add.error());
    console.log(e); // eslint-disable-line
  }
}

export function* undoAddService(action = {}) {
  yield put(actions.services.add.pending());

  try {
    const [key, service] = action.payload || [];
    yield put(actions.services.add.undo.success(
      key,
      service));
  } catch (e) {
    yield put(actions.services.add.error());
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeEvery(actions.services.add.start.toString(), addService);
  yield takeEvery(actions.services.add.undo.start.toString(), undoAddService);
}
