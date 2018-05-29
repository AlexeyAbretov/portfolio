import { put, takeEvery } from 'redux-saga/effects';
import { getPreset } from 'actions';
import api from './api';

function* resetPresetAsync() {
  try {
    const data = yield api.getPreset();
    yield put(getPreset(data));
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery('RESET_PRESET_DATA', resetPresetAsync);
}
