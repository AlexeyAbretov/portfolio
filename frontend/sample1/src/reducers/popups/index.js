import { handleActions } from 'redux-actions';

import actions, { initState } from 'symbiotes/popups';

export default handleActions({
  [actions.popups.open.pending]: state => ({
    ...state,
    loading: true
  }),
  [actions.popups.open.error]: state => ({
    ...state,
    loading: false
  }),
  [actions.popups.open.success]: (state, action) => {
    const [name, data] = action.payload || [];

    const opened = (data || {}).isPreserve ?
      state.opened || [] :
      [];

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
      loading: false
    };
  },

  [actions.popups.close.pending]: state => ({
    ...state,
    loading: true
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
          ...state.opened.slice(index + 1)]
      };
    }

    return state;
  },
  [actions.popups.close.error]: state => ({
    ...state,
    loading: false
  })
}, initState);
