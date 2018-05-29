import { delay } from 'redux-saga';
import { put, select, takeEvery } from 'redux-saga/effects';
import { addServiceAwaiter } from 'actions';
import { OperationStatus } from 'consts';
import api from '../api';

function* addServiceAsync(action) {
  try {
    const preset = yield select(state => state.preset || {});
    const service = action.payload || {};
    const model = {
      presetServiceId: preset.id,
      services: [
        {
          serviceId: service.connected === true ? null : service.id,
          splId: service.splId
        }
      ]
    };
    const data = yield api.addService(model);
    const result = (data || {}).result;
    yield delay(300);
    if ((data || {}).isSucceeded && result) {
      yield put(addServiceAwaiter({ status: OperationStatus.Success }));
    } else {
      yield put(addServiceAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(addServiceAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

export default function* () {
  yield takeEvery('ADD_SERVICE', addServiceAsync);
}
