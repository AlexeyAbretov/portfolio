import {
  GET_PAYMENT_HISTORY
} from 'consts';

const operationHistory = (state = [], action) => {
  switch (action.type) {
    case GET_PAYMENT_HISTORY:
      return action.data;
    default:
  }

  return state;
};

export default operationHistory
;
