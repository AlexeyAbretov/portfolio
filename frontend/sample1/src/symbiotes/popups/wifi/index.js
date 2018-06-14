import { createSymbiote } from 'redux-symbiote';

const { actions } = createSymbiote({}, {
  wifi: {
    router: {
      save: (state, data) =>
        ({ ...state, data })
    }
  }
});

export default actions;
