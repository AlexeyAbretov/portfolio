import { put, takeEvery, select } from 'redux-saga/effects';
import { speedUpAwaiter } from 'actions';
import { OperationStatus } from 'consts';
import api from '../api';

function* speedUpAsync(action) {
  try {
    const preset = yield select(state => state.preset || {});
    const vsu = yield select(state => (state.preset || {}).vsu || {});
    const model = {
      presetServiceId: preset.id,
      services: [
        {
          serviceId: (action.payload || {}).id,
          splId: vsu.splId
        }
      ]
    };
    const data = yield api.speedUp(model);
    const result = (data || {}).result;
    if ((data || {}).isSucceeded && result) {
      yield put(speedUpAwaiter({ status: OperationStatus.Success }));
    } else {
      yield put(speedUpAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(speedUpAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

export default function* () {
  yield takeEvery('SPEED_UP', speedUpAsync);
}
