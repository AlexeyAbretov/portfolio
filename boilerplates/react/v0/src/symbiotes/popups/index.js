import { createSymbiote } from 'redux-symbiote';

export const initState = {
  opened: []
};

export const { actions, reducer } = createSymbiote(initState, {
  popups: {
    open: {
      start: state => ({ ...state }),
      pending: state => ({ ...state }),
      success: (state, name, data) => ({
        ...state,
        popups: [
          ...(state.popups || []).filter(x => x.name !== name),
          {
            name,
            data
          }
        ]
      }),
      fail: state => ({ ...state })
    },
    close: {
      start: state => ({ ...state }),
      pending: state => ({ ...state }),
      success: (state, name) => ({
        ...state,
        popups: [
          ...state.popups.filter(x => x.name !== name)
        ]
      }),
      fail: state => ({ ...state })
    }
  }
});
