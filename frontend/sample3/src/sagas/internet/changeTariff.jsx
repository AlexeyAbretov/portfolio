import { delay } from 'redux-saga';
import { put, select, takeEvery } from 'redux-saga/effects';
import { changeTariffAwaiter } from 'actions';
import { OperationStatus } from 'consts';
import api from '../api';

function* changeTariffAsync(action) {
  try {
    const preset = yield select(state => state.preset || {});
    const internet = yield select(state => (state.preset || {}).internet || {});
    const model = {
      presetServiceId: preset.id,
      services: [
        {
          serviceId: action.payload.id,
          splId: internet.splId
        }
      ]
    };
    const data = yield api.changeTariff(model);
    const result = (data || {}).result;
    yield delay(300);
    if ((data || {}).isSucceeded && result) {
      yield put(changeTariffAwaiter({ status: OperationStatus.Success }));
    } else {
      yield put(changeTariffAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(changeTariffAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

export default function* () {
  yield takeEvery('CHANGE_TARIFF', changeTariffAsync);
}
