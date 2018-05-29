import {
  SET_REQUESTS, SET_REQUEST_DETAILS
} from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case SET_REQUESTS:
      return action.requests;
    case SET_REQUEST_DETAILS:
      {
        const r = state.map((item) => {
          const newItem = { ...item };
          if (newItem.requestId === action.details.requestId) {
            newItem.details = action.details;
          }
          return newItem;
        });
        return r;
      }
    default:
  }

  return state;
};
