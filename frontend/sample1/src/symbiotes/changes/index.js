import { createSymbiote } from 'redux-symbiote';

export const initState = {
  loading: false
};

const { actions } = createSymbiote(initState, {
  services: {
    add: {
      start: (state, key, service) => ({ ...state, key, service }),
      pending: state => ({ ...state }),
      success: (state, key, service) => ({ ...state, key, service }),
      error: state => ({ ...state }),
      undo: {
        start: (state, key, service) => ({ ...state, key, service }),
        success: (state, key, service) => ({ ...state, key, service })
      },
    },
    remove: {
      start: (state, key, service) => ({ ...state, key, service }),
      pending: state => ({ ...state }),
      success: (state, key, service) => ({ ...state, key, service }),
      error: state => ({ ...state }),
      undo: {
        start: (state, key, service) => ({ ...state, key, service }),
        success: (state, key, service) => ({ ...state, key, service })
      },
    },

    toggle: {
      start: (state, key, service) => ({ ...state, key, service })
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
