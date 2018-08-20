import { put, takeLatest } from 'redux-saga/effects';

import {
  actions
} from 'src/symbiotes/popups';

export function* closePopup(action = {}) {
  yield put(actions.popups.close.pending());

  try {
    const [name] = action.payload || [];
    yield put(actions.popups.close.success(
      name
    ));
  } catch (e) {
    yield put(actions.popups.close.fail());
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.popups.close.start.toString(), closePopup);
}
