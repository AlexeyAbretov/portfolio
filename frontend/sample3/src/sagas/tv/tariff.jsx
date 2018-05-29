import { put, takeEvery, select } from 'redux-saga/effects';

import actions from 'symbiotes/tv';

import popupsActions from 'symbiotes/popups';

import {
  OperationStatus,
  PopupsNames
} from 'consts';

import api from 'sagas/api';

import {
  getPreset as getPresetSelector
} from 'selectors/presets';

import {
  getPreset
} from 'actions';

import {
  getTv,
  getSelectedTv
} from 'selectors/tv';

function* changeAsync() {
  try {
    yield put(popupsActions.popups.status.set(OperationStatus.Pending));

    const preset = yield select(state => getPresetSelector(state));
    const tv = yield select(state => getTv(state));
    const { id } = yield select(state => getSelectedTv(state) || {});

    if (!id) {
      return;
    }

    const model = {
      presetServiceId: preset.id,
      services: [
        {
          serviceId: id,
          splId: tv.splId
        }
      ]
    };

    const data = yield api.changeTvTariff(model);
    const result = (data || {}).result;

    if ((data || {}).isSucceeded && result) {
      const newPresetData = yield api.getPreset();
      yield put(getPreset(newPresetData));

      yield put(popupsActions.popups.status.set(OperationStatus.Success));
    } else {
      yield put(popupsActions.popups.status.set(OperationStatus.Fail));
    }
  } catch (e) {
    yield put(popupsActions.popups.status.set(OperationStatus.Fail));
    console.log(e);
  }
}

function* selectAsync(action = {}) {
  try {
    const [id] = action.payload || [];

    if (id) {
      yield put(popupsActions.popups.open.start(
        PopupsNames.Tv.Change,
        { id }));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* () {
  yield takeEvery(actions.tv.change.start, changeAsync);
  yield takeEvery(actions.tv.select.start, selectAsync);
}
