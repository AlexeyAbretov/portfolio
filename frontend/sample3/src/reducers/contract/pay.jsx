import { handleActions } from 'redux-actions';

import {
  immediatePayFromCustomerCard,
  immediatePayFromCustomerCardAwaiter,
  immediatePayFromCustomerCardResetAwaiter
} from 'actions';
import { OperationStatus } from 'consts';

const pay = handleActions({
  [immediatePayFromCustomerCard]() {
    return { status: OperationStatus.Pending };
  },
  [immediatePayFromCustomerCardAwaiter](state = { status: {} }, action) {
    return action.payload || { status: {} };
  },
  [immediatePayFromCustomerCardResetAwaiter]() {
    return { status: {} };
  }
}, {});

export default pay;
