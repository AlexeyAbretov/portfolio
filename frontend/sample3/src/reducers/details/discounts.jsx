import {
  GET_DISCOUNTS_HISTORY
} from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case GET_DISCOUNTS_HISTORY:
      return action.data;
    default:
  }

  return state;
}
;
