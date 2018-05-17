import { put, select, takeLatest } from 'redux-saga/effects';

import
  actions
from 'symbiotes/activity';

export function* setup() {
  yield put(actions.presets.setup.pending());

  try {
    const options = yield select(state => state.options);

    if (!options.profileUrl) {
      yield put(actions.presets.setup.error());
      return;
    }

    location.href = options.profileUrl;
  } catch (e) {
    yield put(actions.presets.setup.error());
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.presets.setup.start.toString(), setup);
}
