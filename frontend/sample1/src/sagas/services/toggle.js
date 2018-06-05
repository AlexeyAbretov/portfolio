import { put, takeLatest, select } from 'redux-saga/effects';

import actions from 'symbiotes/changes';

import {
  ServiceTypes
} from 'consts';

import {
  getPresets,
  getChanges
} from 'selectors';

function* toggle({
  service,
  changes,
  presetId
}) {
  const serviceId = service.id;
  const serviceChanges = changes[presetId] || {};

  if (service.isAllow) {
    const added = (serviceChanges.added || [])
      .find(x => x.id === serviceId);
    if (!added) {
      yield put(actions.services.add.start(
        presetId,
        service));
    } else {
      yield put(actions.services.add.undo.start(
        presetId,
        service));
    }
  } else if (service.isPreInclude) {
    const removed = (serviceChanges.removed || [])
      .find(x => x.id === serviceId);
    if (!removed) {
      yield put(actions.services.remove.start(
        presetId,
        service));
    } else {
      yield put(actions.services.remove.undo.start(
        presetId,
        service));
    }
  }
}

const relatedServiceTypes = {
  [ServiceTypes.TvTariff]: ServiceTypes.TvConsole,
  [ServiceTypes.TvConsole]: ServiceTypes.TvTariff,
};

export function* toggleService(action = {}) {
  const [presetId, serviceId] = action.payload || [];

  try {
    const presets = yield select(getPresets);
    const changes = yield select(getChanges);

    const preset = (presets || []).find(x => x.id === presetId);

    if (!preset || preset.isConnected) {
      return;
    }

    const services = preset.services || [];
    const service = services
      .find(x => x.id === serviceId);

    if (!service || service.isRequired) {
      return;
    }

    const type = service.type;
    const isTve = service.isTve;

    yield toggle({
      service, presetId, changes
    });

    if (!isTve && relatedServiceTypes[type]) {
      const related = services
        .find(x => x.type === relatedServiceTypes[type] &&
          !x.isTve);

      if (related) {
        yield toggle({
          service: related, presetId, changes
        });
      }
    }
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.services.toggle.start.toString(), toggleService);
}
