import { delay } from 'redux-saga';
import { put, takeEvery, select } from 'redux-saga/effects';
import {
  immediatePayFromCustomerCardAwaiter,
  allPaymentTypes
} from 'actions';
import { IMMEDIATE_PAY_FROM_CUSTOMER_CARD, OperationStatus } from 'consts';
import api from '../api';

function* immediatePayFromCustomerCardAsync(action) {
  try {
    const data = yield api.payFromCard(action.payload);
    yield delay(100);
    if ((data || {}).isSucceeded && (data || {}).result === true) {
      yield put(immediatePayFromCustomerCardAwaiter({ status: OperationStatus.Success }));
    } else {
      yield put(immediatePayFromCustomerCardAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(immediatePayFromCustomerCardAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

function* allPaymentTypesAsync() {
  const url = yield select(state => (state.options || {}).paymentTypesUrl);
  if (url) {
    location.href = url;
  }
}

export default function* () {
  yield takeEvery(IMMEDIATE_PAY_FROM_CUSTOMER_CARD, immediatePayFromCustomerCardAsync);
  yield takeEvery(allPaymentTypes.toString(), allPaymentTypesAsync);
}
