import { GET_CALLS_HISTORY } from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case GET_CALLS_HISTORY:
      return action.data;
    default:
  }

  return state;
}
;
