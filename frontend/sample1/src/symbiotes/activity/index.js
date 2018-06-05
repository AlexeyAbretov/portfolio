import { createSymbiote } from 'redux-symbiote';

export const initState = {
  loading: false
};

const { actions } = createSymbiote(initState, {
  presets: {
    setup: {
      start: (state, presetId) => ({ ...state, presetId }),
      pending: state => ({ ...state }),
      success: (state, presetId) => ({ ...state, presetId }),
      error: state => ({ ...state }),
    }
  },
  services: {
    setup: {
      start: (state, data) => ({ ...state, data }),
      pending: state => ({ ...state }),
      success: (state, data) => ({ ...state, data }),
      error: state => ({ ...state }),
    }
  }
});

export default actions;
