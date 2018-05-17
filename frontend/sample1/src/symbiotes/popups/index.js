import { createSymbiote } from 'redux-symbiote';

export const initState = {
  opened: [],
  loading: false
};

const { actions } = createSymbiote(initState, {
  popups: {
    open: {
      start: (state, name, data) =>
        ({ ...state, name, data }),
      pending: state => ({ ...state }),
      success: (state, name, data) =>
        ({ ...state, name, data }),
      error: state => ({ ...state })
    },
    close: {
      start: (state, name) => ({ ...state, name }),
      pending: state => ({ ...state }),
      success: (state, name) => ({ ...state, name }),
      error: state => ({ ...state })
    },

    toggle: {
      start: (state, name, data) =>
       ({ ...state, name, data })
    }
  }
});

export default actions;
