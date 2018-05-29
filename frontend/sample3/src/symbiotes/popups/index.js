import { createSymbiote } from 'redux-symbiote';

import {
    OperationStatus
} from 'consts';

export const initState = {
  opened: [],
  status: OperationStatus.Default
};

const { actions } = createSymbiote(initState, {
  popups: {
    open: {
      start: (state, name, data) =>
        ({ ...state, name, data }),
      pending: state => ({ ...state }),
      success: (state, name, data) =>
        ({ ...state, name, data }),
      fail: state => ({ ...state })
    },
    close: {
      start: (state, name) => ({ ...state, name }),
      pending: state => ({ ...state }),
      success: (state, name) => ({ ...state, name }),
      fail: state => ({ ...state })
    },

    status: {
      set: (state, status) => ({ ...state, status })
    }
  }
});

export default actions;
