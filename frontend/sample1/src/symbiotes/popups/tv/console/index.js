import { createSymbiote } from 'redux-symbiote';

const { actions } = createSymbiote({}, {
  tv: {
    console: {
      save: (state, data) =>
        ({ ...state, data })
    }
  }
});

export default actions;
