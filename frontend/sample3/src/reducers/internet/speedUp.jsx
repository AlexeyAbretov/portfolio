import { handleActions } from 'redux-actions';

import {
  speedUp,
  speedUpAwaiter,
  speedUpResetAwaiter
} from 'actions';
import { OperationStatus } from 'consts';

export default handleActions({
  [speedUp]() {
    return { status: OperationStatus.Pending };
  },
  [speedUpAwaiter](state = { status: {} }, action) {
    return action.payload || { status: {} };
  },
  [speedUpResetAwaiter]() {
    return { status: {} };
  }
}, {});
