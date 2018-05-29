import { handleActions } from 'redux-actions';

import {
  changeTariff,
  changeTariffAwaiter,
  changeTariffResetAwaiter
} from 'actions';
import { OperationStatus } from 'consts';

export default handleActions({
  [changeTariff]() {
    return { status: OperationStatus.Pending };
  },
  [changeTariffAwaiter](state = { status: {} }, action) {
    return action.payload || { status: {} };
  },
  [changeTariffResetAwaiter]() {
    return { status: {} };
  }
}, {});
