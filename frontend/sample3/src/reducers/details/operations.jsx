import {
  GET_OPERATION_HISTORY
} from 'consts';

const operationHistory = (state = [], action) => {
  switch (action.type) {
    case GET_OPERATION_HISTORY:
      return action.data;
    default:
  }

  return state;
};

export default operationHistory
;
