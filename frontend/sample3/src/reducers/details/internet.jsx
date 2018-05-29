import { GET_INTERNET_HISTORY } from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case GET_INTERNET_HISTORY:
      return action.data;
    default:
  }

  return state;
}
;
