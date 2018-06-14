import { createSymbiote } from 'redux-symbiote';

const { actions } = createSymbiote({}, {
  antivir: {
    save: (state, data) =>
        ({ ...state, data })
  }
});

export default actions;
