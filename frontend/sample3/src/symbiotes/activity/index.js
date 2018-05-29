import { createSymbiote } from 'redux-symbiote';

import {
  OperationStatus
} from 'consts';

export const initState = {
  activities: [],
  status: OperationStatus.Default
};

const { actions } = createSymbiote(initState, {
  activity: {
    start: (state, name) =>
      ({ ...state, name }),
    pending: state => ({ ...state }),
    success: (state, name, status) =>
      ({ ...state, name, status }),
    fail: state => ({ ...state })
  }
});

export default actions;
