import { put, takeLatest } from 'redux-saga/effects';

import actions from 'symbiotes/popups';
import antivirActions from 'symbiotes/popups/antivir';
import changesActions from 'symbiotes/changes';

import {
  PopupNames
} from 'consts';

export function* save(action = {}) {
  const [data] = action.payload || [];
  const { preset, services } = data || {};

  try {
    yield put(changesActions.services.toggle.start(
      preset, services));
    yield put(actions.popups.close.start(
      PopupNames.Antivir));
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(antivirActions.antivir.save.toString(), save);
}
