import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { activatePromisePaymentAwaiter } from 'actions';
import { ACTIVATE_PROMISE_PAYMENT, OperationStatus } from 'consts';
import api from '../api';

function* activatePromisePaymentAsync() {
  try {
    const data = yield api.activatePromisePayment();
    yield delay(100);
    if ((data || {}).isSucceeded && ((data || {}).result || {}).isSucceeded === true) {
      yield put(activatePromisePaymentAwaiter({ status: OperationStatus.Success }));
    } else {
      yield put(activatePromisePaymentAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(activatePromisePaymentAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(ACTIVATE_PROMISE_PAYMENT, activatePromisePaymentAsync);
}
