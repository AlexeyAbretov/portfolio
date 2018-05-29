import { handleActions } from 'redux-actions';

import {
  addService,
  addServiceAwaiter,
  addServiceResetAwaiter
} from 'actions';
import { OperationStatus } from 'consts';

export default handleActions({
  [addService]() {
    return { status: OperationStatus.Pending };
  },
  [addServiceAwaiter](state = { status: {} }, action) {
    return action.payload || { status: {} };
  },
  [addServiceResetAwaiter]() {
    return { status: {} };
  }
}, {});
