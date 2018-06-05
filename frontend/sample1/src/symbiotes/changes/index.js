import { createSymbiote } from 'redux-symbiote';

export const initState = {
  loading: false
};

const { actions } = createSymbiote(initState, {
  services: {
    add: {
      start: (state, key, data) => ({ ...state, key, data }),
      pending: state => ({ ...state }),
      success: (state, key, data) => ({ ...state, key, data }),
      error: state => ({ ...state }),
      undo: {
        start: (state, key, data) => ({ ...state, key, data }),
        success: (state, key, data) => ({ ...state, key, data })
      },
    },
    remove: {
      start: (state, key, data) => ({ ...state, key, data }),
      pending: state => ({ ...state }),
      success: (state, key, data) => ({ ...state, key, data }),
      error: state => ({ ...state }),
      undo: {
        start: (state, key, data) => ({ ...state, key, data }),
        success: (state, key, data) => ({ ...state, key, data })
      },
    },

    toggle: {
      start: (state, key, data) => ({ ...state, key, data })
    },

    set: {
      start: (state, key, data) => ({ ...state, key, data }),
      pending: state => ({ ...state }),
      success: (state, key, data) => ({ ...state, key, data }),
      error: state => ({ ...state })
    }
  }
});

export default actions;
