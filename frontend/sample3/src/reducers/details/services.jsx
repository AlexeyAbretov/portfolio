import {
  GET_SERVICES_ACTIVITY_HISTORY
} from 'consts';

export default (state = [], action) => {
  switch (action.type) {
    case GET_SERVICES_ACTIVITY_HISTORY:
      return action.data;

    default:
  }

  return state;
}
;
