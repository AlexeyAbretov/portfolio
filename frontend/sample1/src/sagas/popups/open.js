import { put, takeLatest } from 'redux-saga/effects';

import
  actions
from 'symbiotes/popups';

export function* openPopup(action = {}) {
  yield put(actions.popups.open.pending());

  try {
    const [name, data] = action.payload || [];
    yield put(actions.popups.open.success(
      name,
      data));
  } catch (e) {
    yield put(actions.popups.open.error());
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.popups.open.start.toString(), openPopup);
}
