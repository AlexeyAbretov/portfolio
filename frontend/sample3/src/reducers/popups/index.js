import { handleActions } from 'redux-actions';

import {
    OperationStatus
} from 'consts';

import actions, { initState } from 'symbiotes/popups';

export default handleActions({
  [actions.popups.open.pending]: state => ({
    ...state,
    status: OperationStatus.Pending
  }),
  [actions.popups.open.fail]: state => ({
    ...state,
    status: OperationStatus.Fail
  }),
  [actions.popups.open.success]: (state, action) => {
    const [name, data] = action.payload || [];

    const opened = state.opened || [];

    let popup = opened.find(x => x.name === name);

    if (!popup) {
      popup = {
        name,
        data
      };
    } else {
      popup = {
        ...popup,
        data
      };
    }

    return {
      opened: [
        ...opened.filter(x => x.name !== name),
        popup
      ],
      status: OperationStatus.Default
    };
  },

  [actions.popups.close.pending]: state => ({
    ...state,
    status: OperationStatus.Pending
  }),
  [actions.popups.close.success]: (state, action) => {
    const [name] = action.payload || [];

    if (!name) {
      return state;
    }

    const index = (state.opened || [])
      .findIndex(x => x.name === name);

    if (index >= -1) {
      return {
        opened: [
          ...state.opened.slice(0, index),
          ...state.opened.slice(index + 1)
        ],
        status: OperationStatus.Default
      };
    }

    return state;
  },
  [actions.popups.close.fail]: state => ({
    ...state,
    status: OperationStatus.Fail
  }),

  [actions.popups.status.set]: (state, action) => {
    const [status] = action.payload || [];

    if (!status) {
      return state;
    }

    return {
      ...state,
      status
    };
  }
}, initState);
