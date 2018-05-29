import { put, takeLatest, select } from 'redux-saga/effects';

import
  actions
from 'symbiotes/changes';

import getChanges from 'selectors/changes';
import {
  getPreset
} from 'selectors/presets';

export function* toggleService(action = {}) {
  const [key, service] = action.payload || [];

  try {
    if (!key || !service) {
      return;
    }

    const preset = yield select(getPreset);
    const changes = yield select(getChanges);

    if (!preset.id) {
      return;
    }

    const changesByKey = changes[key] || {};
    const added = changesByKey.added || [];
    const removed = changesByKey.removed || [];

    if (!service.connected && added.find(x => x.id === service.id)) {
      yield put(actions.services.add.undo.start(
        key,
        service));
    } else if (!service.connected && !added.find(x => x.id === service.id)) {
      yield put(actions.services.add.start(
        key,
        service));
    } else if (service.connected && removed.find(x => x.id === service.id)) {
      yield put(actions.services.remove.undo.start(
        key,
        service));
    } else if (service.connected && !removed.find(x => x.id === service.id)) {
      yield put(actions.services.remove.start(
        key,
        service));
    }
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.services.toggle.start.toString(), toggleService);
}
