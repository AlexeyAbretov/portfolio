import { handleActions } from 'redux-actions';

import {
    activatePromisePayment,
    activatePromisePaymentAwaiter,
    activatePromisePaymentResetAwaiter
} from 'actions';
import { OperationStatus } from 'consts';

const promisePayment = handleActions({
  [activatePromisePayment]() {
    return { status: OperationStatus.Pending };
  },
  [activatePromisePaymentAwaiter](state = { status: {} }, action) {
    return action.payload || { status: {} };
  },
  [activatePromisePaymentResetAwaiter]() {
    return { status: {} };
  }
}, {});

export default promisePayment;
