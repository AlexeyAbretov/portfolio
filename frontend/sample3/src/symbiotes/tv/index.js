import { createSymbiote } from 'redux-symbiote';

const initState = {
};

const { actions } = createSymbiote(initState, {
  tv: {
    change: {
      start: state => ({ ...state })
    },
    select: {
      start: (state, id) => ({ ...state, id })
    },
    packages: {
      change: {
        start: state => ({ ...state })
      }
    }
  }
});

export default actions;
