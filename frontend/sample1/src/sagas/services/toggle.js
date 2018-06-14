import { put, takeLatest, select, all, call } from 'redux-saga/effects';

import actions from 'symbiotes/changes';

import {
  ServiceTypes
} from 'consts';

import {
  getPresets,
  getChanges
} from 'selectors';

import {
  getAvailableMappings,
  getServiceMappingState,
  SavedMappingStates
} from 'selectors/mappings';

function* toggle({
  service,
  changes,
  presetId,
  mappings
}) {
  const serviceId = service.id;
  const serviceChanges = changes[presetId] || {};
  const hasMapping = SavedMappingStates.includes(
    getServiceMappingState(
      { mappings, preset: { id: presetId }, service }));

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
  } else if (service.isPreInclude || hasMapping) {
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

    const preset = (presets || [])
      .find(x => x.id === presetId);

    if (!preset || preset.isConnected) {
      return;
    }

    let services = Array.isArray(serviceId) ?
      (preset.services || [])
        .filter(x => serviceId.includes(x.id)) :
      (preset.services || [])
        .filter(x => x.id === serviceId);

    services = services.filter(x => !x.isRequired);

    if (!services || !services.length) {
      return;
    }

    const changes = yield select(getChanges);
    const mappings = yield select(getAvailableMappings);
    let calls = [];
    services.forEach((service, index) => {
      const type = service.type;
      const isTve = service.isTve;

      calls = [
        ...calls,
        call(toggle, { service, presetId, changes, mappings })
      ];

      if (!isTve && relatedServiceTypes[type] && index === 0) {
        const related = (preset.services || [])
          .find(x => x.type === relatedServiceTypes[type] &&
            !x.isTve);

        if (related) {
          calls = [
            ...calls,
            call(toggle, { service: related, presetId, changes, mappings })
          ];
        }
      }
    });

    yield all(calls);
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeLatest(actions.services.toggle.start.toString(), toggleService);
}
