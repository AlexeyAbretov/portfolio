import { put, takeEvery, select } from 'redux-saga/effects';

import actions from 'symbiotes/tv';
import popupsActions from 'symbiotes/popups';
import changesActions from 'symbiotes/changes';

import {
  OperationStatus,
  TvPacketTypes
} from 'consts';

import api from 'sagas/api';

import {
  getPreset as getPresetSelector
} from 'selectors/presets';

import {
  getTv,
  getCurrentConnectingPackets,
  getTvPacketsChanges
} from 'selectors/tv';

import {
  getPreset
} from 'actions';

function* changeAsync() {
  try {
    const preset = yield select(state => getPresetSelector(state));
    const tv = yield select(state => getTv(state));
    const packetsIds = yield select(
      state => getCurrentConnectingPackets(state)
        .map(x => x.id));

    const model = {
      presetServiceId: preset.id,
      services: [
        {
          serviceId: tv.id,
          splId: tv.splId,
          packetsIds
        }
      ]
    };
    const data = yield api.changeTvPackages(model);
    const result = (data || {}).result;
    if ((data || {}).isSucceeded && result) {
      const changes = yield select(state => getTvPacketsChanges(state));

      yield put(changesActions.services.set.success(
        `${preset.id}_${tv.id}`,
        {
          added: [
            ...changes.added
              .filter(x => x.type !== TvPacketTypes.Concrete)
          ],
          removed: [
            ...changes.removed
              .filter(x => x.type !== TvPacketTypes.Concrete)
          ]
        }));

      const newPresetData = yield api.getPreset();
      yield put(getPreset(newPresetData));

      yield put(popupsActions.popups.status.set(OperationStatus.Success));
    } else if (!(data || {}).isSucceeded && result) {
      // yield put(changeTvPackagesAwaiter({
      //   status: OperationStatus.Fail,
      //   isBlocked: result.isBlocked === true,
      //   hasPromisedPayment: result.hasPromisedPayment === true,
      //   hasLowBalance: result.hasLowBalance === true
      // }));
      yield put(popupsActions.popups.status.set(OperationStatus.Fail));
    } else {
      yield put(popupsActions.popups.status.set(OperationStatus.Fail));
    }
  } catch (e) {
    yield put(popupsActions.popups.status.set(OperationStatus.Fail));
    console.log(e);
  }
}

export default function* () {
  yield takeEvery(actions.tv.packages.change.start, changeAsync);
}
