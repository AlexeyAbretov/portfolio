import {
  GET_TURBO_BUTTON_HISTORY
} from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case GET_TURBO_BUTTON_HISTORY:
      return action.data;

    default:
  }

  return state;
}
;
