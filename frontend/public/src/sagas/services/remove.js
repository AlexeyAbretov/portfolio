import { put, takeEvery } from 'redux-saga/effects';

import
  actions
from 'symbiotes/changes';

function* remove(action) {
  yield put(actions.services.remove.pending());

  try {
    const [presetId, service] = action.payload || [];
    yield put(actions.services.remove.success(
      presetId, service
    ));
  } catch (e) {
    yield put(actions.services.remove.error());
    console.log(e); // eslint-disable-line
  }
}

export function* undoRemoveService(action = {}) {
  yield put(actions.services.remove.pending());

  try {
    const [presetId, service] = action.payload || [];
    yield put(actions.services.remove.undo.success(
      presetId,
      service));
  } catch (e) {
    yield put(actions.services.remove.error());
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeEvery(actions.services.remove.start.toString(), remove);
  yield takeEvery(actions.services.remove.undo.start.toString(), undoRemoveService);
}
